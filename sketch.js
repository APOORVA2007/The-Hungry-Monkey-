//Creating global variables for different objects
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;
var monkey_collided;


//Defining Gamestates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Images and animations are loaded 
function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided = loadAnimation("sprite_0.png");

  bananaImage = loadImage("banana.png");

  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  //Creating the Canvas
  createCanvas(400,400);
  
  //Creating Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  //Creating Monkey
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
 //Creating Ground
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
  //score
  score = 0;
  survialTime = 0;
  
}

function draw() {
  
  //Background color
  background ("skyBlue");
  
  //displaying survial time
  stroke("black");
  fill("black");
  textSize(20);
  text("Survial Time:"+  survialTime, 70, 50);
  
  //displaying score
  stroke("black");
  fill("black");
  textSize(20);
  text("Score:"+  score, 260, 50);
  
 //Monkey does not fall
  monkey.collide(ground);
  
  //Assigning functions to Gamestate PLAY
  if(gameState === PLAY){
    monkey.changeAnimation("running", monkey_running);
    
    survialTime = Math.ceil(frameCount/frameRate());
     
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 310) {
        monkey.velocityY = -17;
    }    
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score + 2;
    }
   
   //Gravity
   monkey.velocityY = monkey.velocityY + 0.8;
  
   //calling functions for food and obstacles
   food();
   obstacles();
    
  //Gamestate changes to end once monkey touches obstacles
   if(obstacleGroup.isTouching(monkey)){       
     gameState = END;     
  }
    
    
  }
  //Assigning functions to Gamestate END
   if (gameState === END) {
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
     
    monkey.changeAnimation("monkey_collided");
     
    //assigning lifetime to groups in END state 
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);    
     
    ground.velocityX = 0;
     
    survialTime.visible = false;
     
    //displaying Gameover message
    stroke("navy");
    fill("navy");
    textSize(30);
    text("Game Over", 110, 200);
     
   }
 
   //drawing the sprites
   drawSprites();
}

//Creating function for food and assigning functions to it
function food() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    
    banana.addImage(bananaImage);
    
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
  
}


//Creating function for obstacles and assigning functions to it
function obstacles() {
  
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    
    obstacle.addImage(obstacleImage);
    
    obstacle.velocityX = -4;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
    
    obstacleGroup.add(obstacle);
  }

}






