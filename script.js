var gif_createImg;
var yval;
var versnelling;
var snelheid;
var massa;



function setup(){
  createCanvas(640, 360);
  achtergrond = loadImage("images/achtergrond.jpg");
  yval = 0;
  snelheid = 0;
  massa = 50;
  vogel = loadImage("images/bird-png.webp");
  versnelling = massa * 0.01;
}

function spel(){
  background(achtergrond);
  snelheid += versnelling;
  yval += snelheid;
  image(vogel, width / 2, yval, massa + 20, massa - 10);

  if (yval > height - massa / 2) {
    snelheid *= -0.6;
    yval = height - massa / 2;
  }
}

function keyPressed(spacebar){
  yval + 40;
  velocity = -massa / 6;
}

function draw(){

spel()
  
}
