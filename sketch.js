let simplex;
let margin = 100;

let canvasContainer, containerWidth, containerHeight;

let gridDimension = 50;
let simplexScale = 0.0025;
let timeScale = 0.005;

function gaussian(x) {
  let factor = Math.exp(-(x ** 2));
  return factor;
}

function shiftedGaussian(start, end, value) {
  let normalizedX = map(value, start, end, -1.5, 1.5);
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

  let totalVerticalDistance = containerHeight - margin * 2;
  let verticalStep = totalVerticalDistance / gridDimension;

  strokeWeight(1);
  stroke("#ffffff");
  fill("#000000");

  for (let index = 0; index < gridDimension + 1; index++) {
    let y = margin + index * verticalStep;
    beginShape();

    // vertex(margin, y + 400);
    for (let index = 0; index < gridDimension + 1; index++) {
      let x = margin + index * verticalStep;

      let noise =
        simplex.noise2D(
          x * simplexScale,
          y * simplexScale - frameCount * timeScale
        ) *
          0.5 +
        0.5;

      let damp = shiftedGaussian(margin, margin + totalVerticalDistance, x);

      vertex(x, y + noise * 200 * -damp);
    }
    // vertex(totalVerticalDistance + margin, y + 400);
    endShape();
  }
}
