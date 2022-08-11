
var gameState = "wait";
var play,about,how,next,home
var waitimg, backgroundIMG, backgroundIMG2
var milleniumFalcon, milleniumFalconTwo, imperialTroop, laser, tatooine, rock;
var score = 0;
var milleniumFalconIMG, milleniumFalconTwoIMG, imperialTroopIMG, tatooineIMG, laserIMG, rockIMG;
var lasers = []
var imperialTroops = []
var rocks = [];
var life = 3, heat = 0;
var explosion, explosionIMG;
var laserSound, explosionSound, bgMusic;
var levelSwitchGifOne, levelOneSwitch;
var livesIMG, scoreIMG, overheatIMG;
var fonts;
var overheatPNG;

function preload(){
milleniumFalconIMG = loadImage("MFlvl1.gif");
milleniumFalconTwoIMG = loadImage("MFlvl2.gif");
imperialTroopIMG = loadImage("enemyShip.png");
explosionIMG = loadImage("explosion.webp");
laserIMG = loadImage("laser.png");
tatooineIMG = loadImage("tatooine.png");
rockIMG = loadImage("rockObstacle.png");
waitimg = loadImage("INVASION.gif");
backgroundIMG = loadImage('BG.gif');
backgroundIMG2 = loadImage('BG3.gif');
laserSound = loadSound("TIE fighter fire 1.mp3");
explosionSound = loadSound("XWing explode.mp3");
bgMusic = loadSound("Music  Asteroid chase.mp3")
levelSwitchGifOne = loadImage("levelChange.gif");
livesIMG = loadImage('LIVES.png');
scoreIMG = loadImage('SCORE.png');
overheatIMG = loadImage('OVERHEAT.png')
fonts = loadFont('PressStart2P-Regular.ttf')
overheatPNG = loadImage('overheatThing.png')
}


function setup(){
createCanvas(windowWidth,windowHeight)

play=createImg("play.png")
play.position(width/2-180,height-270)
play.size(350,350)

back=createImg("back.png")
back.position(-40, height-160)
back.size(300,300)
back.hide()

about=createImg("about.png")
about.position(-35, 380)

how=createImg('how.png') 
how.position(width/2+550, 350)
how.size(700, 700)

howpop = createSprite(width/2,height/2)

aboutpop = createSprite(width/2,height/2)

tatooine = createSprite(width+310, height/2, 10, 10);
tatooine.addImage(tatooineIMG);
tatooine.scale = 5;
tatooine.setCollider("rectangle", 0, 0, 130, height);

milleniumFalcon = createSprite(width-280,height/2,30,30);
milleniumFalcon.addImage(milleniumFalconIMG);
milleniumFalcon.scale = 0.8;

milleniumFalconTwo = createSprite(width/2,height-100,30,30);
milleniumFalconTwo.addImage(milleniumFalconTwoIMG);
milleniumFalconTwo.scale = 0.4;
milleniumFalconTwo.visible = false;

bgMusic.play();
bgMusic.loop();

}


function draw(){
    fill("gold");
    textSize(25);
    textFont(fonts);
if(gameState=="wait"){
    background(waitimg);
    back.hide();
    play.show();
    about.show();
    how.show();
    howpop.visible=false;
    aboutpop.visible=false;
    milleniumFalcon.visible = false;
    tatooine.visible = false;
}

if(play.mousePressed(()=>{
    gameState="levelSwitchTo1"
    howpop.visible=false
    aboutpop.visible=false
    milleniumFalcon.visible = true;
    tatooine.visible = true;
}))

if(back.mousePressed(()=>{
    gameState = "wait"
}))

if(about.mousePressed(()=>{
    gameState = "about"
   
}))

if(how.mousePressed(()=>{
    gameState = "how"
}))

if(gameState=="levelSwitchTo1") {
  background(levelSwitchGifOne);
    play.hide()
    back.show()
    about.hide()
    how.hide()
    howpop.visible=false
    aboutpop.visible=false
    milleniumFalcon.visible = false;
    tatooine.visible = false;
  setTimeout( function() { switchStateOne(); }, 4000);
}

if(gameState==="play"){
    background(backgroundIMG)
    play.hide()
    back.show()
    about.hide()
    how.hide()
    howpop.visible=false
    aboutpop.visible=false
    image(livesIMG, width-320, 0, 240, 75);
    image(scoreIMG, width-320, height-75, 240, 75);
    text("Lives: "+life, width-300, 50);
    text("Score: "+score, width-300, 750); 
    push();
    fill("gold");
    rect(65, 35, heat, 10);
    image(overheatPNG, 15, -30, 333, 500);
    noStroke();
    pop();  
    if(heat == 100) {
        push();
        textSize(20);
        text("OVERHEAT", 35, 20);
        pop();
      }
      move();
      if(keyDown("space") && heat < 100) {
        shoot();
        heat += 5
      }
      if(score <= 50) {
        text("LEVEL 1.1", width/2-100, 50);
          if(frameCount % 60 == 0) {
            createEnemies();
          }
      }
      else if(score <= 100 && score > 50) {
        text("LEVEL 1.2", width/2-100, 50);
          if(frameCount % 30 == 0) {
            createEnemies();
          }
      }
      else if(score > 100 && score < 200) {
        text("LEVEL 1.3", width/2-100, 50);
          if(frameCount % 15 == 0 && score < 195) {
            createEnemies();
          }
      }
      else if(score >= 200) {
        gameState = 'levelTwo';
      }
      if(frameCount % 20 == 0 && heat >= 0) {
        heat -= 5;
      }
      collideFunction();
      gameOverAndLifeReductionLevelOneToThree();
}
else if(gameState == 'levelTwo') {
    play.hide()
    back.show()
    about.hide()
    how.hide()
    howpop.visible=false;
    aboutpop.visible=false;
    background(backgroundIMG2)
    text("Lives: "+life, width-300, 50);
    text("Score: "+score, width-300, 793); 

    for (var i = 0; i < imperialTroops.length; i++) {
      imperialTroops[i].destroy();
    }

    tatooine.destroy();
    milleniumFalcon.destroy();

    milleniumFalconTwo.visible = true;
    if(frameCount % 10 == 0) {
      score += 1;
    }
    moveYes();
    push();
    textSize(50);
    text("AMMO OVER", 50, 40);
    text("RETREAT!", 50, 80);
    pop();
    
    if(score > 200 && score < 300) {
      text("LEVEL 2.1", width/2-100, 50);
      if(frameCount % 20 == 0) {
        createRocks();
      }
    }

    else if(score > 300 && score < 400) {
      text("LEVEL 2.2", width/2-100, 50);
      if(frameCount % 10 == 0) {
        createRocks();
      }
    }

    else if(score > 400 && score <= 500) {
      text("LEVEL 2.3", width/2-100, 50);
      if(frameCount % 10 == 0) {
        createRocks();
      }
    }
    WIN();
    gameOverAndLifeReductionLevelFourToSix();
  }

  else if(gameState == 'LOSS') {
    tatooine.destroy();
    milleniumFalcon.destroy();
    milleniumFalconTwo.destroy();
  }

  else if(gameState == 'WIN') {
    tatooine.destroy();
    milleniumFalcon.destroy();
    milleniumFalconTwo.destroy();
  }

if(gameState === "about") {
    background(0);
    play.hide()
    back.show()
    about.hide()
    how.hide()
 
    aboutpop.visible=true
    howpop.visible=false
}

if(gameState == "how") {
    background(0);
    play.hide()
    back.show()
    about.hide()
    how.hide()
   
    howpop.visible=true;
    aboutpop.visible=false;
}
drawSprites();
}

function createEnemies() {
    imperialTroop = createSprite(0, random(83, 760), 10, 10);
    imperialTroop.addImage(imperialTroopIMG);
    imperialTroop.scale = 0.2;
    imperialTroop.velocityX = 10;
    imperialTroops.push(imperialTroop);
  }
  
  function shoot() {
    laser = createSprite(width-280,height,30,30)
    laser.y = milleniumFalcon.y;
    laser.x = milleniumFalcon.x - 100;
    laser.addImage(laserIMG);
    laser.scale = 0.2;
    laser.velocityX = -30;
    laser.lifetime = 200;
    lasers.push(laser);
    laserSound.play();
  }
  
  function move() {
    if(keyDown("UP") && milleniumFalcon.y >= 83) {
      milleniumFalcon.y -= 10;
    }
    if(keyDown("DOWN") && milleniumFalcon.y <= 760) {
      milleniumFalcon.y += 10;
    }
  }
  
  function collideFunction() {
    for(var i = 0; i<imperialTroops.length; i++) {
      for(var x = 0; x<lasers.length; x++) {
        if(imperialTroops[i].isTouching(lasers[x])) {
          score += 5;
          explosionSound.play();
          lasers[x].destroy();
          imperialTroops[i].addImage(explosionIMG);
          imperialTroops[i].lifetime = 10;
          imperialTroops[i].setCollider("circle", 2000000, 2000000, 2);
          imperialTroops[i].scale = 0.7;
        }
      }
    }
  }
  
  function gameOverAndLifeReductionLevelOneToThree() {
    if (life > 0) {
      for(var i = 0; i<imperialTroops.length; i++) {
        if(imperialTroops[i].isTouching(tatooine)) {
          imperialTroops[i].destroy();
          life -= 1;
        }
      }
    }
  
    else if (life == 0) {
      gameState = 'LOSS';
      for(var i = 0; i<imperialTroops.length; i++) {
          imperialTroops[i].destroy();
      }
      tatooine.destroy();
      milleniumFalcon.destroy();
      milleniumFalconTwo.destroy();
        swal({
          title: `Game Over!`,
          text: "you lost, loser.",
          text: "score: " + score,
          imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
          imageSize: "100x100",
          confirmButtonText: "Press To Retry" 
        },
        function(isConfirm) {
          if (isConfirm) {
            location.reload();
          }
        })
    }
  }
  
  function createRocks() {
    rock = createSprite(random(0, width), 0, 10, 10);
    rock.addImage(rockIMG);
    rock.scale = 0.2;
    rock.velocityY = 10;
    rocks.push(rock);
  }
  
  function moveYes() {
    if(keyDown("LEFT") && milleniumFalconTwo.x >= 30) {
      milleniumFalconTwo.x -= 10;
    }
    if(keyDown("RIGHT") && milleniumFalconTwo.x <= width-30) {
      milleniumFalconTwo.x += 10;
    }
  }
  
  function gameOverAndLifeReductionLevelFourToSix() {
    if (life > 0) {
      for(var i = 0; i<rocks.length; i++) {
        if(rocks[i].isTouching(milleniumFalconTwo)) {
          rocks[i].destroy();
          life -= 1;
          explosionSound.play();
        }
      }
    }
  
    else if (life == 0) {
      tatooine.destroy();
      milleniumFalcon.destroy();
      milleniumFalconTwo.destroy();
      for(var i = 0; i<rocks.length; i++) {
        rocks[i].destroy();
      }
      gameState = 'LOSS';
        swal({
        title: `Game Over!`,
        text: "you lost, loser.",
        text: "score: " + score,
        imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Press To Retry" 
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      })
    }
  }
  
  function WIN() {
    if (life > 0 && score >= 500) {
      tatooine.destroy();
      milleniumFalcon.destroy();
      milleniumFalconTwo.destroy();
      gameState = 'WIN';
        swal({
        title: `Game Over!`,
        text: "Congrats! You Completed The Game!",
        confirmButtonText: "Press To Play Again!" 
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
      )
    }
  }

  function switchStateOne() {
    howpop.visible=false
    aboutpop.visible=false
    milleniumFalcon.visible = true;
    tatooine.visible = true;
    gameState = 'play';
  }