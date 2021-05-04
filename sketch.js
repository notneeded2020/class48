var bread, breadImg;
var bgImg;
var friendGrp, enemyGrp;
var friend, enemy;
var bgImg2,bgImg3;
var button, buttonImg;
var gameState = 1;
var score = 0;
var font1,font2;
var topBread,topBreadImg,topBreadGrp;
var sandwichImg,sandwich;



function preload(){

  bgImg = loadImage("Images/bg3.png");
  bgImg2 = loadImage("Images/bg6.jpg");
  bgImg2 = loadImage("Images/")

  buttonImg = loadImage("Images/start.png")
  
  breadImg = loadImage("Images/bread1.png");
  topBreadImg = loadImage("Images/bread1.png");

  friend1 = loadImage("Images/cheese.png");
  friend2 = loadImage("Images/cucumber.png");
  friend3 = loadImage("Images/lettuce.png");
  friend4 = loadImage("Images/olive.png");
  friend5 = loadImage("Images/patty.png");
  friend6 = loadImage("Images/salami.png");
  friend7 = loadImage("Images/tomato.png");

  enemy1 = loadImage("Images/bomb.png");
  enemy2 = loadImage("Images/bug.png");
  enemy3 = loadImage("Images/poisonapple.png");
  enemy4 = loadImage("Images/poop.png");
  enemy5 = loadImage("Images/rottenSB.png");
  enemy6 = loadImage("Images/sizzleBread.png");

  wth1 = loadImage("Images/huh.png");
  wth2 = loadImage("Images/judging.png");
  wth3 = loadImage("Images/soDone.png");

  yum1 = loadImage("Images/delicious.jpg");
  yum2 = loadImage("Images/perfecto.png");
  yum3 = loadImage("Images/yum.png");

  font1 = loadFont("fonts/Sunshine Wishes.ttf");
  font2 = loadFont("fonts/Lemon Friday.ttf");

  sandwichImg = loadImage("Images/sandwich.png");
 
}



function setup() {
  createCanvas(displayWidth - 50, displayHeight - 50);

  bread = createSprite(displayWidth/2 + 50, displayHeight -100 ,20,10)
  bread.addImage(breadImg);
  bread.scale = 0.5;
  bread.debug = true;
  bread.setCollider("rectangle",0,0,50,50);

  button = createSprite(displayWidth/2 -110,displayHeight/2 +200);
  button.addImage(buttonImg);

  sandwich = createSprite(displayWidth/2,displayHeight/2)
  sandwich.addImage(sandwichImg)

  friendGrp = new Group();
   
  enemyGrp = new Group();

  topBreadGrp = new Group();

}

function draw() {
  //game bg
  background(bgImg); 
  
  //displaying score
  textSize(20)
  fill("black")
  text("Score:" + score,displayWidth -150,150)


  // game state = 1, welcome screen
  if(gameState === 1){

    background(bgImg2)

    bread.visible = false;

    
    if(mousePressedOver(button)){
       gameState = 2;
    }
    
    // Heading
    textSize(40)
    textFont(font1)
    fill("yellow")
    strokeWeight(4)
    stroke("red")
    text("Stack That Sandwich!",displayWidth/2-150,100);


    // Story+Instructions
    textSize(20)
    textFont(font2)
    fill("lightGreen")
    strokeWeight(4)
    stroke("darkGreen")

    text("You are one of the most famous chefs in the city of Sandwicholen.",displayWidth-1160,200);
    text("Sandwiches are the staple food here and your restaurant, Savory Sandwiches,",displayWidth-1160,230);
    text ("is known for the best sandwiches in the world. You have to make a ",displayWidth-1160,260);
    text ("never-seen-before sandwich that will leave everyone in awe. Good Luck!",displayWidth-1160,290);

    text ("How to play:-",displayWidth-1160,390);
    text ("Use the arrow keys to stack your sandwich.",displayWidth-1160,450);
    text ("Don't let the disgusting things get on your sandwich.",displayWidth-1160,480);
  }


  //game state = 2, play mode
  if(gameState === 2){
    spawnFriends();
    spawnEnemies();
    spawnBread(); 

    button.visible = false;
    bread.visible = true;


    if (keyDown(LEFT_ARROW)){
      bread.x = bread.x -10;
    }
  
    if (keyDown(RIGHT_ARROW)){
      bread.x = bread.x +10;
    }
  
  
    for (var i = 0; i < friendGrp.length; i++){
     if (friendGrp.get(i).isTouching(bread)){
       friendGrp.get(i).velocityY = 0
       friendGrp.setLifetimeEach(-1);
       friendGrp.get(i).x = bread.x;
       
     }
    }
  
  
    for (var i = 0; i < enemyGrp.length; i++){
      if (enemyGrp.get(i).isTouching(bread)){
        enemyGrp.get(i).velocityY = 0
        enemyGrp.setLifetimeEach(-1);
      }
     }
  

    for(var a = 0; a < enemyGrp.length; a++){
      if (enemyGrp.get(a).isTouching(bread)){
        friendGrp.destroyEach()
        enemyGrp.destroyEach()
         gameState=3;
        
      }
    }
   

  }


  if(gameState === 3){
      text("Are you sure about that?",displayWidth/2,200);
  }


  






  drawSprites();
}



function spawnFriends(){
  if(frameCount % 50 === 0){
    friend = createSprite(10,20,10,10)
    //friend.scale = 0.5
    friend.velocityY = 10;
    friend.x = Math.round(random(50, displayWidth-70))
    var rand = Math.round(random(1,7))
    switch(rand){
      case 1 : friend.addImage(friend1); //cheese
               friend.scale = 0.5
               friend.setCollider("rectangle",0,0,friend.width,5)
               score = score+1
       break;
      case 2 : friend.addImage(friend2); //cucumber ok
               friend.scale = 0.8
               score = score+2
       break;
      case 3 : friend.addImage(friend3); //lettuce ok
               friend.scale = 0.5
               score = score+3
       break;
      case 4 : friend.addImage(friend4); //olive ok
              friend.scale = 0.5
              score = score+4
       break;
      case 5 : friend.addImage(friend5); //patty
               friend.scale = 0.5
               friend.setCollider("rectangle",0,0,friend.width,15)
               score = score+5
       break;
      case 6 : friend.addImage(friend6); //salami
               friend.scale = 0.5
               friend.setCollider("rectangle",0,0,friend.width,15)
               score = score+6
       break;
      case 7 : friend.addImage(friend7); //tomato ok
               friend.scale = 0.2
               score = score+7
       break;
       default : break;
    }
  friendGrp.add(friend);
  friend.lifetime = displayHeight-50/10;

  }
}

function spawnEnemies(){
  if (frameCount % 100 === 0){
  enemy = createSprite(10,20,10,10);
  enemy.velocityY = 15; 
 // enemy.scale = 0.5;
  enemy.x = Math.round(random(100,displayWidth-70));
  var rand = Math.round(random(1,6))

  switch(rand){
    case 1 : enemy.addImage(enemy1);
    enemy.scale = 0.5;
    score = score - 6
    break;
    case 2 : enemy.addImage(enemy2);
    enemy.scale = 0.5;
    score = score - 1
    break;
    case 3 : enemy.addImage(enemy3);
    enemy.scale = 0.2;
    score = score - 3
    break;
    case 4 : enemy.addImage(enemy4);
    enemy.scale = 0.5;
    score = score - 2
    break;
    case 5 : enemy.addImage(enemy5);
    enemy.scale = 0.5;
    score = score - 4
    break;
    case 6 : enemy.addImage(enemy6);
    enemy.scale = 0.5;
    score = score - 5
    break;

  }
 enemyGrp.add(enemy);
 enemy.lifetime = displayHeight-50/10;
}

}

function spawnBread(){
  if(frameCount % 100 === 0){
    topBread = createSprite(10,20,20,20)
    topBread.scale = 0.5;
    topBread.velocityY = 10;

    topBread.debug = true;
    topBread.setCollider("rectangle",0,0,300,300)
    topBread.x = Math.round(random(50, displayWidth-70))

    topBread.addImage(topBreadImg);
    topBread.lifetime = displayHeight-50/10;

    topBreadGrp.add(topBread);
  }

  if(topBreadGrp.isTouching(bread)){
    console.log("touched")
    topBreadGrp.setVelocityYEach(0);
    topBreadGrp.x = bread.x;
    topBreadGrp.setLifetimeEach(-1)
    gameState = 4;
  }

  

}







