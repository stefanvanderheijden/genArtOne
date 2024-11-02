let simplex;
let marginX = 100;
let marginY = 200;

let canvasContainer, containerWidth, containerHeight;

let gridDimensionX = 100;
let gridDimensionY = 30;
let simplexScaleX = 0.0025;
let simplexScaleY = 0.005;
let timeScale = 0.005;

function gaussian(x) {
  let factor = Math.exp(-(x ** 2));
  return factor;
}

function shiftedGaussian(start, end, value) {
  let normalizedX = map(value, start, end, -2, 2);
  return gaussian(normalizedX);
}

function setup() {
  canvasContainer = select("#canvas-container");
  containerWidth = canvasContainer.width;
  containerHeight = canvasContainer.height;

  console.log("Canvas Width: " + containerWidth);
  console.log("Canvas Height: " + containerHeight);

  canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(canvasContainer);

  // Create a new instance of SimplexNoise
  simplex = new SimplexNoise();
}

function draw() {
  background("#000000");

  let totalVerticalDistance = containerHeight - marginY * 2;
  let totalHorizontalDistance = containerWidth - marginX * 2;
  let verticalStep = totalVerticalDistance / gridDimensionY;
  let horizontalStep = totalHorizontalDistance / gridDimensionX;

  strokeWeight(2);
  stroke("#ffffff");
  fill("#000000");
  // noFill();

  for (let index = 0; index < gridDimensionY + 1; index++) {
    let y = marginY + index * verticalStep;
    beginShape();

    vertex(marginX, y + 400);
    for (let index = 0; index < gridDimensionX + 1; index++) {
      let x = marginX + index * horizontalStep;

      let noise =
        simplex.noise2D(
          x * simplexScaleX,
          y * simplexScaleY - frameCount * timeScale
        ) *
          0.5 +
        0.5;

      let distance = dist(mouseX, mouseY, x, y);
      let bump = -gaussian(distance / 100);
      let addedBump = bump * 100;

      let damp = shiftedGaussian(marginX, marginX + totalHorizontalDistance, x);

      vertex(x, y + noise * 200 * -damp + addedBump);
      // vertex(x, y + addedBump * damp);
    }
    vertex(totalHorizontalDistance + marginX, y + 400);
    endShape();
  }
  noStroke();
  // stroke("#ef0000");
  fill("#000000");
  rect(0, 0, marginX + 2, containerHeight);
  rect(
    marginX + totalHorizontalDistance - 2,
    0,
    containerWidth,
    containerHeight
  );
}
