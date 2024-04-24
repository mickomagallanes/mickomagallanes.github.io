const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
const BOTTOM_TREES_HEIGHT = 69;
const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;
const SPRITE_WIDTH = 48;
const SPRITE_HEIGHT = 96;

const CANVAS = document.getElementById("game");
const CONTEXT = CANVAS.getContext("2d");
const FOG_CANVAS = document.getElementById("fogCanvas");
const FOG_CONTEXT = FOG_CANVAS.getContext("2d");

const loadImage = (src, callback = () => {}) => {
  const img = new Image();

  img.src = src;

  img.onload = () => {
    callback(img);
  };

  return img;
};

const hashArray = (arr) => {
  return arr.sort().join("|");
};

function getVisibleCanvasWidth() {
  const canvasRect = CANVAS.getBoundingClientRect();
  const visibleWidth =
    Math.min(canvasRect.right, window.innerWidth) -
    Math.max(canvasRect.left, 0);

  return visibleWidth;
}

function getVisibleCanvasHeight() {
  if (!CANVAS) return 0; // Canvas not found

  const canvasRect = CANVAS.getBoundingClientRect();
  const visibleHeight =
    Math.min(canvasRect.bottom, window.innerHeight) -
    Math.max(canvasRect.top, 0);

  return visibleHeight;
}

function createDirections(y) {
  return [
    { x: 7, y: y },
    { x: 0, y: y },
    { x: 6, y: y },
    { x: 0, y: y },
    { x: 1, y: y },
    { x: 2, y: y },
    { x: 8, y: y },
    { x: 2, y: y },
  ];
}

function createDirectionsDiag(y) {
  return [
    { x: 4, y: y },
    { x: 3, y: y },
    { x: 11, y: y },
    { x: 3, y: y },
    { x: 4, y: y },
    { x: 5, y: y },
    { x: 9, y: y },
    { x: 5, y: y },
  ];
}
