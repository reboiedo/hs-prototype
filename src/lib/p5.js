function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background(255);
  let numSquares = 10;
  let squareSize = height / numSquares;

  for (let y = 0; y < height; y += squareSize) {
    for (let x = 0; x < width; x += squareSize) {
      stroke(0);
      fill(255);
      rect(x, y, squareSize, squareSize);
    }
  }
}

function mouseMoved() {
  redraw();
  let numSquares = 10;
  let squareSize = height / numSquares;

  for (let y = 0; y < height; y += squareSize) {
    for (let x = 0; x < width; x += squareSize) {
      if (
        mouseX > x &&
        mouseX < x + squareSize &&
        mouseY > y &&
        mouseY < y + squareSize
      ) {
        stroke(255, 0, 0);
      } else {
        stroke(0);
      }
      fill(255);
      rect(x, y, squareSize, squareSize);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
