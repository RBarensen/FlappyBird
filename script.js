class rechthoek {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "green";
  }

  drawrechthoek() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    this.x += -3;
  }
}
  
  
var gif_createImg;
var yval;
var versnelling;
var snelheid;
var pipes = [];
var massa;



function setup() {
  createCanvas(640, 360);
  achtergrond = loadImage("images/achtergrond.jpg");
  yval = 0;
  snelheid = 0;
  massa = 50;
  vogel = loadImage("images/bird-png.webp");
  versnelling = massa * 0.01;
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
  });
}

function keyPressed(){
 if (key == ' '){
  yval + 50;
  snelheid = -massa / 6;
  }
}

function draw() {

  spel()

}
