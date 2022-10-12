class rechthoek { 
  constructor(x, y, h, img) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = 75;
    this.img = img;
    this.color = "red";
  }

  drawrechthoek() {
    fill(this.color);
    image(this.img, this.x, this.y, this.w, this.h);    
    this.x -= 5;
  }


  checkCollision() {
    if (width / 2 + 20 > this.x && (width / 2 + 40) < this.x + this.w) {
      if (yval + massa - 20 > this.y && yval < this.y + this.h) {
        this.color = "red;"
        gs = 2;
      }
    }
    else {
      this.color = "green";
    }
  }
}

function preload(){
   backgroundMusic = loadSound('music/BackgroundMusic.mp3');
   ding = loadSound('music/Ding.mp3')
   vogel = loadImage("images/bird-png.webp");
   beginafb = loadImage("images/Startscreen.png")
   eindafb = loadImage("images/dood.jpg")
   achtergrond = loadImage("images/achtergrond.jpg");
   rck1 = loadImage("images/uwr.png");
   rck2 = loadImage("images/dwr.png");
}

  
  
var gif_createImg;
var yval;
var versnelling;
var snelheid;
var pipes = [];
var massa;
var rects = [];
var score = 0;
var highscore = 0;

let gs = 0

function setup() {
  createCanvas(640, 360);
  yval = 0;
  snelheid = 0;
  massa = 50;
  versnelling = massa * 0.01;
  backgroundMusic.play();
}


function spel() {
  background(achtergrond);
  snelheid += versnelling;
  yval += snelheid;
  image(vogel, width / 2, yval, massa + 20, massa - 10);

  if (yval > height - massa / 2) {
    snelheid *= -0.6;
    yval = height - massa / 2;
  }

  if (frameCount % 85 == 0) {


    randomheight = random(height - 150);

    pijp2 = new rechthoek(700, 0, randomheight + 50, rck2)
    pijp1 = new rechthoek(700, randomheight + 175, 200, rck1)

    pipes.push(pijp1);
    pipes.push(pijp2);
 
    // remove unnessecary pipes
    if (pipes.length > 6) {
      pipes.splice(0, 2);
    }
  }

  if (frameCount % 85 == 0 && pipes.length > 3) {
   score = score + 1;
   ding.play();
  if (score > highscore){
    highscore = score;
  }
  }  

    pipes.forEach((p) => {
    p.drawrechthoek()
    p.checkCollision()  
  });

  fill('white');
  textSize(25);
  text('Score:', 25, 35);
  text(score, 100, 35);
  text('Highscore:', 25, 75);
  text(highscore, 145, 75);


}
 
function keyPressed(){
 if (key == ' '){
  yval + 50;
  snelheid = -massa / 6;
  }
}

function start() {
  background(beginafb);
}

function speelspel() {
  spel();
}

function klaar() {
  background(eindafb);
  fill('white');
  textSize(100);
  text('Game Over', 80, 200);
}

function draw() {

   if (gs == 0) {
    start();
  } else if (gs == 1) {
    speelspel();
  }
  else if (gs == 2) {
    klaar();
  }
}

function mousePressed() {
  console.log(gs);
  if (gs == 0) {
    gs += 1;


  } else if (gs == 2) {
    pipes = [];
    score = 0;
    gs = 0;
  }
}

