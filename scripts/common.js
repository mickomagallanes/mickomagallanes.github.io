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
  const canvas = document.getElementById("game");
  if (!canvas) return 0; // Canvas not found

  const canvasRect = canvas.getBoundingClientRect();
  const visibleWidth =
    Math.min(canvasRect.right, window.innerWidth) -
    Math.max(canvasRect.left, 0);

  return visibleWidth;
}

function getVisibleCanvasHeight() {
  const canvas = document.getElementById("game");
  if (!canvas) return 0; // Canvas not found

  const canvasRect = canvas.getBoundingClientRect();
  const visibleHeight =
    Math.min(canvasRect.bottom, window.innerHeight) -
    Math.max(canvasRect.top, 0);

  return visibleHeight;
}

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;
const SPRITE_WIDTH = 48;
const SPRITE_HEIGHT = 96;
