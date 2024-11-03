let simplex;
let marginX = 100;
let marginY = 600;

let canvasContainer, containerWidth, containerHeight, colorTop, colorBottom;

let gridDimensionX = 300;
let gridDimensionY = 60;
let simplexScaleX = 0.0025;
let simplexScaleY = 0.0015;
let timeScale = 0.006;

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
  colorMode(HSL);

  backgroundColor = color("#000000");
  colorTop = color("#1900ff");
  colorBottom = color("#ffff00");

  console.log("Canvas Width: " + containerWidth);
  console.log("Canvas Height: " + containerHeight);

  canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(canvasContainer);

  // Create a new instance of SimplexNoise
  simplex = new SimplexNoise();
}

function draw() {
  marginY = 300 + sin(frameCount * 0.01) * 400;
  background(backgroundColor);
  let verticalScale = 150 + sin(frameCount * 0.01) * 150;

  let totalVerticalDistance = containerHeight - marginY * 2;
  let totalHorizontalDistance = containerWidth - marginX * 2;
  let verticalStep = totalVerticalDistance / gridDimensionY;
  let horizontalStep = totalHorizontalDistance / gridDimensionX;

  stroke("#ffffff");
  fill(backgroundColor);
  // noFill();

  for (let index = 0; index < gridDimensionY + 1; index++) {
    let y = marginY + index * verticalStep;
    let normalizedY = (y - marginY) / totalVerticalDistance;
    beginShape();

    let localColor = lerpColor(colorTop, colorBottom, normalizedY);
    strokeWeight(normalizedY * 5 + 1);
    stroke(localColor);

    vertex(marginX, y + 400);
    for (let index = 0; index < gridDimensionX + 1; index++) {
      let x = marginX + index * horizontalStep;

      let noise =
        simplex.noise2D(
          x * simplexScaleX,
          y * simplexScaleY + frameCount * timeScale
        ) *
          0.5 +
        0.5;

      let subnoise = simplex.noise2D(x * 0.05 - frameCount * 0.01, y * 0.05);

      let distance = dist(mouseX, mouseY, x, y);
      let bump = -gaussian(distance / 100);
      let addedBump = bump * 100;

      let damp = shiftedGaussian(marginX, marginX + totalHorizontalDistance, x);

      vertex(x, y + noise * verticalScale * -damp + addedBump + subnoise * 3);
      // vertex(x, y + addedBump * 5 * damp + subnoise * 3);
    }
    vertex(totalHorizontalDistance + marginX, y + 400);
    endShape();
  }
  noStroke();
  // stroke("#ef0000");
  fill(backgroundColor);
  rect(0, 0, marginX + 4, containerHeight);
  rect(
    marginX + totalHorizontalDistance - 4,
    0,
    containerWidth,
    containerHeight
  );
}
