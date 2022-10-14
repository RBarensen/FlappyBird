// creert class voor rechthoeken waarin de obstakels komen
class rechthoek { 
  // constructor voor de rechthoeken
  constructor(x, y, h, img) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = 75;
    this.img = img;
    this.color = "red";
  }
// tekent rechthoek met afbeeldingen erin
  drawrechthoek() {
    image(this.img, this.x, this.y, this.w, this.h);    
    this.x -= 5;
  }

// controleert of de astronaut de obstakels raakt
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

// zet elke afbeeldingen en elk geluid in een variabele
function preload(){
   backgroundMusic = loadSound('music/BackgroundMusic.mp3');
   ding = loadSound('music/Ding.mp3')
   vogel = loadImage("images/bird-png.webp");
   beginafb = loadImage("images/Startscreen.jfif")
   eindafb = loadImage("images/dood.jpg")
   achtergrond = loadImage("images/achtergrond.jpg");
   rck1 = loadImage("images/uwr.png");
   rck2 = loadImage("images/dwr.png");
}

  
 // geeft default voor een aantal variabelen 
var gif_createImg;
var yval;
var versnelling;
var snelheid;
var pipes = [];
var massa;
var rects = [];
var score = 0;
var highscore = 0;
let gs = 0;

// zorgt voor de basis van het spel
function setup() {
  createCanvas(640, 360);
  yval = 0;
  snelheid = 0;
  massa = 50;
  versnelling = massa * 0.01;
  backgroundMusic.play();
}


// zorgt voor het daadwerkelijke spel > eg. beweging vogel, achtergrond, en obstakels
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

    // zorgt voor nieuwe obstakels
    pijp2 = new rechthoek(700, 0, randomheight + 50, rck2)
    pijp1 = new rechthoek(700, randomheight + 175, 200, rck1)

    pipes.push(pijp1);
    pipes.push(pijp2);
 
    // haalt onnodige obstakels weg
    if (pipes.length > 6) {
      pipes.splice(0, 2);
    }
  }


  // reguleert alle processen voor als astronaut door een obstakel is
  if (frameCount % 85 == 0 && pipes.length > 3) {
   score = score + 1;
   ding.play();
  if (score > highscore){
    highscore = score;
  }
  }  
// tekent elk obstakel
    pipes.forEach((p) => {
    p.drawrechthoek()
    p.checkCollision()  
  });

  // zorgt voor tekst linksboven met (high)score
  fill('white');
  textSize(25);
  text('Score:', 25, 35);
  text(score, 100, 35);
  text('Highscore:', 25, 75);
  text(highscore, 145, 75);


}

// reguleert het springen van de astronaut
function keyPressed(){
 if (key == ' '){
  yval + 50;
  snelheid = -massa / 6;
  }
}

// functies die bij verschillende gamestates horen
function start() {
  background(beginafb);
}

function speelspel() {
  spel();
}

function klaar() {
  background(eindafb);
  fill('aquamarine');
  textSize(100);
  text('Game Over', 80, 200);
  textSize(25);
  text('Your score is:', 80, 250);
  text(score, 240, 250)
  text('Your highscore is: ', 80, 280);
  text(highscore, 285, 280);
  text('Press to return to the main menu', 80, 310)
}

// tekent het spel voor elke gamestate
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

// laat van gamestates switchen
function mousePressed() {
  console.log(gs);
  if (gs == 0) {
    gs += 1;


// reset alle relevante variabelen
  } else if (gs == 2) {
    pipes = [];
    score = 0;
    gs = 0;
  }
}

