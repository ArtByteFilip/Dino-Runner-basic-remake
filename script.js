const image = document.querySelector("img");
const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

const FPS = 60;
let score = 0;

var playerSize = 50;

var playerPosX = 50;
var playerPosY = 50;

var kaktus1PosX = canvas.width;
var kaktus1PosY = 350;
var kaktus1Vyska = 40;

var kaktus2PosX = canvas.width;
var kaktus2PosY = 310;
var kaktus2Vyska = 80;

const moveSpeed = 10;

var pravda = false;

function gameLoop() {
  drawStuff();
  moveStuff();

  requestAnimationFrame(gameLoop);
  //setTimeout(gameLoop, 1000 / FPS);
}

function drawStuff() {

  objekt("lightgray", 0, 0, canvas.width, canvas.height); // Pozadie
  objekt("white", 0, canvas.height - 160, canvas.width, canvas.height); // Grass 

  if(pravda == true) {
    objekt("white", kaktus1PosX, kaktus1PosY, playerSize, playerSize + kaktus1Vyska); // Kaktus menší
  } else if (pravda == false) {
    objekt("white", kaktus2PosX, kaktus2PosY, playerSize, playerSize + kaktus2Vyska); // Kaktus väčší
  }

  ctx.font = '20px arial';
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 10, 25);

  objekt("red", playerPosX, playerPosY, playerSize, playerSize);
  
}

velocityY = 0;
var podmienka = true;

function moveStuff() {
  kolozia();
  if(pravda == true) {
    kaktus1PosX = kaktus1PosX - moveSpeed; // Kaktus menší
  } else if (pravda == false) {
    kaktus2PosX = kaktus2PosX - moveSpeed; // Kaktus väčší
  }

  playerPosY = playerPosY + 10

  if (velocityY == 1) {
    playerPosY = playerPosY - 20
  } 

  if (playerPosY < 180) {
    velocityY = 0;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function kolozia() {

  if(kaktus1PosX < 0) {
    kaktus1PosX = canvas.width;
    if (getRandomInt(2) == 0) {
      pravda = false;
    } else {
      pravda = true;
    }
  }

  if(kaktus2PosX < 0) {
    kaktus2PosX = canvas.width;
    if (getRandomInt(2) == 0) {
      pravda = false;
    } else {
      pravda = true;
    }
  }

  if (playerPosX + playerSize == kaktus1PosX) {
    if (playerPosY + playerSize > kaktus1PosY) {
      score = 0;
    } else {
      score++
    }
  }

  if (playerPosX + playerSize == kaktus2PosX) {
    if (playerPosY + playerSize > kaktus2PosY) {
      score = 0;
    } else {
      score++
    }
  }

  if (playerPosY > 380) {
    playerPosY = 379;
  }
}

function objekt(color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

document.body.onkeyup = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) {
    velocityY = 1;
  }
}

gameLoop();