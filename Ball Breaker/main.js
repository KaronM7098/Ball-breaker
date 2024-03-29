//requestion animation frames from window to be updated later on
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
 
//instantiating variables for canvas, player and ball

const canvas = document.querySelector("canvas");

const c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var player = {
  x: canvas.width/2,
  y: 500,
  width: 175,
  height: 15,
};

var ball = {
  x: 800,
  y: 470,
  radius: 10,
  velX: -4,
  velY: -5,
};
var gameStarted = false;
const header = document.getElementById("header");
//arrays to hold brick objects and keys pressed
var bricks = [];
var keys = [];

//brick class to create any amount of bricks using the set parameters
class Brick {
  constructor(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.visible = true; 
  }
}

bricks.push(new Brick(350, 50, 40, 100));
bricks.push(new Brick(475, 50, 40, 100));
bricks.push(new Brick(600, 50, 40, 100));
bricks.push(new Brick(725, 50, 40, 100));
bricks.push(new Brick(850, 50, 40, 100));
bricks.push(new Brick(975, 50, 40, 100));
bricks.push(new Brick(350, 100, 40, 100));
bricks.push(new Brick(350, 150, 40, 100));
bricks.push(new Brick(475, 100, 40, 100));
bricks.push(new Brick(475, 150, 40, 100));
bricks.push(new Brick(600, 100, 40, 100));
bricks.push(new Brick(600, 150, 40, 100));
bricks.push(new Brick(725, 100, 40, 100));
bricks.push(new Brick(725, 150, 40, 100));
bricks.push(new Brick(850, 100, 40, 100));
bricks.push(new Brick(850, 150, 40, 100));
bricks.push(new Brick(975, 100, 40, 100));
bricks.push(new Brick(975, 150, 40, 100));

function update() {
  if (!gameStarted) return;

  ball.x += ball.velX;
  ball.y += ball.velY;

 
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.fillStyle = "white";
  c.fillRect(player.x, player.y, player.width, player.height);

  placeBricks(bricks);

  c.fillStyle = "white";
  c.beginPath();
  c.arc(ball.x, ball.y, ball.radius, 0, 6.28, false);
  c.fill();

  if (keys[39] && player.x < canvas.width - player.width) {
    player.x += 10;
  } else if (keys[37] && player.x > 0) {
    player.x -= 10;
  }

  ballCol();

  requestAnimationFrame(update);
}

function ballCol() {
  // Ball and player collision
  //top and bottom collisions
  if (ball.y + ball.radius >= player.y && ball.y <= player.y + player.height && ball.x + ball.radius >= player.x && ball.x <= player.x + player.width) {
    ball.velY *= -1;
  }
if(ball.x + ball.radius >= player.x && ball.x <= player.x + player.width && ball.y < player.height + player.y && ball.y > player.y) {
    ball.velX *= -1;
  }
  // Wall collisions
  if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
    ball.velX *= -1;
  }
  if (ball.y - ball.radius <= 0) {
    ball.velY *= -1;
  }

  /*if (ball.y - ball.radius <= 0) {
    ball.velY *= -1;
  }*/

  // Brick collisions
  for (let i = 0; i < bricks.length; i++) {
    if (bricks[i].visible && ball.x + ball.radius >= bricks[i].x
       && ball.x - ball.radius <= bricks[i].x + bricks[i].width 
       && ball.y + ball.radius >= bricks[i].y && ball.y - ball.radius <= bricks[i].y + bricks[i].height) {
      ball.velY *= -1;
      bricks[i].visible = false; 
    }
    
  }
  //check if win:
  
}


function placeBricks(bricks) {
  c.fillStyle = "blue";
  for (let i = 0; i < bricks.length; i++) {
    if (bricks[i].visible) {
      c.fillRect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height);
    }
  }
}

document.body.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;

  if (!gameStarted && (e.keyCode === 37 || e.keyCode === 39)) {
    
    gameStarted = true;
    requestAnimationFrame(update);
  }
});
//event list
document.body.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false;
});

window.addEventListener("load", function () {
  update();
});
