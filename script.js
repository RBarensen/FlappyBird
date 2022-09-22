class rechthoek {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "red";
  }

  drawrechthoek() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    this.x += -3;
  }

  checkCollision() {
    if (width / 2 + 50 > this.x && (width / 2) < this.x + this.w) {
      if (yval + massa - 10 > this.y && yval < this.y + this.h) {
        this.color = "red";
        gs = 2;
      }
    }
    else {
      this.color = "green";
    }
  }
}



  
  
var gif_createImg;
var yval;
var versnelling;
var snelheid;
var pipes = [];
var massa;
var score = 0;

let gs = 0

function setup() {
  createCanvas(640, 360);
  achtergrond = loadImage("images/achtergrond.jpg");
  yval = 0;
  snelheid = 0;
  massa = 50;
  vogel = loadImage("images/bird-png.webp");
  versnelling = massa * 0.01;
  beginafb = loadImage("images/startscreen.png")
  eindafb = loadImage("images/dood.jpg")
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

    pijp1 = new rechthoek(700, 0, 50, randomheight)
    pijp2 = new rechthoek(700, randomheight + 150, 50, 300)

    pipes.push(pijp1);
    pipes.push(pijp2);
 
    // remove unnessecary pipes
    if (pipes.length > 6) {
      pipes.splice(0, 2);
    }
  }

    pipes.forEach((p) => {
    p.drawrechthoek()
    p.checkCollision()  
  });

  fill('white');
  textSize(25);
  text('Score:', 50, 35)
  text(score, 100, 35);
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

    gs = 0;
  }
}

