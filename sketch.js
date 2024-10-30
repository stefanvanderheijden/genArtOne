let simplex;
let margin = 50;

let canvasContainer, containerWidth, containerHeight;

let gridDimension = 30;

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
  noLoop();
}

function draw() {
  background("#ffedc0");

  let totalVerticalDistance = containerHeight - margin * 2;
  let verticalStep = totalVerticalDistance / gridDimension;

  strokeWeight(1);
  noFill();

  for (let index = 0; index < gridDimension + 1; index++) {
    let y = margin + index * verticalStep;

    for (let index = 0; index < gridDimension + 1; index++) {
      let x = margin + index * verticalStep;
      let diameter =
        sin(frameCount * 0.01 + x * 0.01 + y * 0.01) * verticalStep;
      circle(x, y, diameter);
    }
  }
}
