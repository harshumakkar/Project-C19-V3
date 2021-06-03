var galaxy, galaxyImage, enemyGroup, bulletsGroup, commandGroup;

var score = 0;

var gameState = "start";

var homeCraft1, homeCraft2, homeCraft3, homeCrImg;

var lives = 3;

var enemy, enemyImg1, enemyImg2, enemyImg3, enemyImg4;

var defender, defenderImg, gun1, gun2, bullet1, bullet2, shield;

function preload(){
  galaxyImage = loadImage("Galaxy.jpg");
  
  //homeCrImg = loadImage("home.png");
  
  //enemyImg1 = loadImage("enemy.png");
  //enemyImg2 = loadImage("enemy2.jpg");
  //enemyImg3 = loadImage("enemy3.png");
  //enemyImg4 = loadImage("enemy4.png");
  
  //defenderImg = loadImage("defender.png");
}

function setup() {
  createCanvas(1000,400);
  
  galaxy = createSprite(650,150);
  galaxy.addImage("Galaxy", galaxyImage);
  galaxy.scale = 1.7;
  galaxy.velocityX = -0.3;
  
  homeCraft1 = createSprite(910,320,150,100);
  homeCraft1.shapeColor = "cyan";
  
  homeCraft2 = createSprite(910,200,150,100);
  homeCraft2.shapeColor = "cyan";
  
  homeCraft3 = createSprite(910,80,150,100);
  homeCraft3.shapeColor = "cyan";
  
  defender = createSprite(730,200,130,60);
  defender.shapeColor = "powderBlue";
  //defender.addImage("defender", defenderImg);
  
  gun1 = createSprite(defender.x-70,defender.y-10,30,10);
  gun1.shapeColor = "cadetBlue";
  gun2 = createSprite(defender.x-70, defender.y+10,30,10);
  gun2.shapeColor = "cadetBlue";
  
  enemyGroup = new Group();
  bulletsGroup = new Group();
  commandGroup = new Group();
  
  console.log();
  console.log("Welcome to my 'Galaxy Defender' Game! You need to control your defender which   has guns. Control it using the up and down arrow keys. Use the space key to shoot the enemies before they touch your command crafts.");
}

function draw() {
  background(220);
  
  gun1.y = defender.y-10;
  gun2.y = defender.y+10;
  
  if(gameState === "start") {
    background("SteelBlue");
    textSize(20);
    fill("white");
    text("Welcome to Galaxy Defender! You objective in this game is to survive for as long as possible. To control your defender,  which has guns, use the up and down arrow keys. Use the space key to shoot the enemies approaching from the left side. Shoot them before they touch you command crafts. As your score increases, the speed of your enemies will, too. Good luck!", 200, 100, 600);
    text("Press 'space' to continue!", 400,300);
    
    if(keyWentDown("space")) {
      gameState = "play";
    }
  }
  
    
  if(gameState === "play") {
    if(galaxy.x < 345) {
      galaxy.x = 500;
    }
    
    if(keyDown("up")) {
      defender.y -= 10;
      gun1.y -= 10;
      gun2.y -=10;
    }
    if(keyDown("down")) {
      defender.y += 10;
      gun1.y += 10;
      gun2.y += 10;
    }
    
    if(keyWentDown("space")) {
      shoot();
    }
     
    edges = createEdgeSprites();
    if(defender.isTouching(edges)) {
      defender.x = 730;
      defender.y = 200;
      gun1.y = defender.y-10;
      gun2.y = defender.y+10;
    }
    
    if(enemyGroup.isTouching(bulletsGroup)) {
      score += 1;
      enemyGroup.destroyEach();
      bulletsGroup.destroyEach();
    }
    
    if(enemyGroup.isTouching(homeCraft1) && lives > 0) {
      homeCraft1.destroy();
      enemyGroup.destroyEach();
      lives -= 1;
    }
    if(enemyGroup.isTouching(homeCraft2) && lives > 0) {
      homeCraft2.destroy();
      enemyGroup.destroyEach();
      lives -= 1;
    }
    if(enemyGroup.isTouching(homeCraft3) && lives > 0) {
      homeCraft3.destroy();
      enemyGroup.destroyEach();
      lives -= 1;
    }
    
    if(lives === 0) {
      gameState = "end"
    }
       
    spawnEnemies();
    drawSprites();
    
    fill("white");
    textSize(18);
    text("Score: "+score,10,20);
  }
  
  if(gameState === "end") {
    background("black");
    
    textSize(30);
    fill("red");
    text("Game Over",450,200);
    
    textSize(20);
    fill("yellow");
    text("Your Score: "+score, 460, 300);
  }
  
}

function spawnEnemies() {
  if(frameCount%120 === 0) {
    enemy = createSprite(0,Math.round(random(50,350)));
    enemy.velocityX = (score/7)+1.5;
    enemy.lifetime = 1100;
    
    enemyGroup.add(enemy);
    
    var num = Math.round(random(1,8));
    
    switch(num) {
      case 1: //enemy.addImage("img1", enemyImg1);
        enemy.width = 100;
        enemy.height = 80;
        enemy.shapeColor = "olive";
      break;
      case 2: //enemy.addImage("img2", enemyImg2);
        enemy.width = 50;
        enemy.height = 100;
        enemy.shapeColor = "lime";
      break;
      case 3: //enemy.addImage("img3", enemyImg3);
        enemy.width = 75;
        enemy.height = 20;
        enemy.shapeColor = "YellowGreen";
      break;
      case 4: //enemy.addImage("img4", enemyImg4);
        enemy.width = 15;
        enemy.height = 50;
        enemy.shapeColor = "springGreen";
      break;
      case 5: enemy.width = 60;
        enemy.height = 60;
        enemy.shapeColor = "seaGreen";
      break;
      case 6: enemy.width = 130;
        enemy.height = 60;
        enemy.shapeColor = "paleGreen";
      break;
      case 7: enemy.width = 90;
        enemy.height = 10;
        enemy.shapeColor = "lawnGreen";
      break;
      case 8: enemy.width = 10;
        enemy.height = 70;
        enemy.shapeColor = "chartreuse";
      break;
      default: break;
    }
  }
}

function shoot() {
  bullet1 = createSprite(defender.x-85,defender.y-10,10,10);
  bullet1.shapeColor = "red";
  bullet1.velocityX = -20;
  bullet1.lifetime = 70;
  
  bullet2 = createSprite(defender.x-85,defender.y+10,10,10);
  bullet2.shapeColor = "red";
  bullet2.velocityX = -20;
  bullet2.lifetime = 70;
  
  bulletsGroup.add(bullet1);
  bulletsGroup.add(bullet2);
}