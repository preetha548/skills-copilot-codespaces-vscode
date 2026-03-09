function setup() {
  createCanvas(400, 400);
  background("ForestGreen");
}

function draw() {
  background("ForestGreen");
  strokeWeight(0);

  flower(); //SIEHE FUNCTION FLOWER
}

function flower() {
  //WENN MAN EIGENE FUNKTION FÜR OBJEKT AUS MEHREREN BESTANDTEILEN NUTZT,KANN MAN FUNCTION DRAW AUFGERÄUMTER HALTEN
  fill("LightCoral");
  ellipse(230, 200, 40, 40);
  ellipse(170, 200, 40, 40);
  ellipse(200, 230, 40, 40);
  ellipse(200, 170, 40, 40);
  fill("DarkRed");
  ellipse(200, 200, 35, 35);
}
