var bg, bgImg;
var player, shooterImg, shooter_shooting;
var explosion, oneheart, twoheart, threeheart, zombieImg;
var ZombieGrp;
var a = 1;
var life=3

function preload() {

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bgImg = loadImage("assets/bg.jpeg")
  explosion = loadSound("assets/explosion.mp3");

  oneheart = loadImage("assets/heart_1.png")
  twoheart = loadImage("assets/heart_2.png")
  threeheart = loadImage("assets/heart_3.png")

  zombieImg = loadImage("assets/zombie.png")


}

function setup() {


  createCanvas(windowWidth, windowHeight);


  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.5;


  //creating the player sprite
  player = createSprite(displayWidth - 1700, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)

  ZombieGrp = new Group();
}

function draw() {
  background(0);




  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    if (player.y > 60) {
      player.y = player.y - 10
    }
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    if (player.y < 540) {
      player.y = player.y + 10
    }
  }


  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {
    a = 0
    player.addImage(shooter_shooting)
    explosion.play();
  }

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    a = 1
    player.addImage(shooterImg)
  }


  if (ZombieGrp.isTouching(player)) {
    if (a == 0) {
      for (var i = 0; i < ZombieGrp.length; i++) {
        if (ZombieGrp[i].isTouching(player)) {
          ZombieGrp[i].destroy();
        }
      }
    }
    else{
      life-=1
      console.log(life);
    }
  }
  spawnEnemy();
  drawSprites();

}

function spawnEnemy() {
  if (frameCount % 50 === 0) {
    zombie = createSprite(random(500, 1100), random(100, 500), 40, 40);
    zombie.addImage(zombieImg);
    zombie.scale = 0.15;
    zombie.velocityX = -3;
    zombie.debug = true;
    zombie.setCollider("rectangle", 0, 0, 400, 400);
    zombie.lifetime = 250;
    player.depth+=1;
    ZombieGrp.add(zombie);

  }

}
