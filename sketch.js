let simplex;
let margin = 50;

let canvasContainer, containerWidth, containerHeight;

let noOfLines = 30;

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
  background("#ffedc0");

  let totalVerticalDistance = containerHeight - margin * 2;
  let verticalStep = totalVerticalDistance / noOfLines;

  strokeWeight(1);

  for (let index = 0; index < noOfLines + 1; index++) {
    let y = margin + index * verticalStep;
    let xStart = margin;
    let xEnd = containerWidth - margin;

    line(xStart, y, xEnd, y);
  }

  for (let index = 0; index < noOfLines + 1; index++) {
    let x = margin + index * verticalStep;
    let yStart = margin;
    let yEnd = containerWidth - margin;

    line(x, yStart, x, yEnd);
  }
}
