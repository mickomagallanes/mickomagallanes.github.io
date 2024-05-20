const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
const BOTTOM_TREES_HEIGHT = 69;
const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;
const LEFT_A = 65;
const RIGHT_D = 68;
const UP_W = 87;
const DOWN_S = 83;
const PLAYER_WIDTH = 48;
const PLAYER_HEIGHT = 96;

const CANVAS = document.getElementById("game");
const CONTEXT = CANVAS.getContext("2d");
const FOG_CANVAS = document.getElementById("fogCanvas");
const FOG_CONTEXT = FOG_CANVAS.getContext("2d");

const RESUME_WIDTH = 32;
const RESUME_HEIGHT = 34;

const hashArray = (arr) => {
  return arr.sort().join("|");
};

const DIRECTION_KEYS = new Map([
  [hashArray([RIGHT]), "right"],
  [hashArray([LEFT]), "left"],
  [hashArray([UP]), "up"],
  [hashArray([DOWN]), "down"],
  [hashArray([DOWN, RIGHT]), "downRight"],
  [hashArray([DOWN, LEFT]), "downLeft"],
  [hashArray([UP, RIGHT]), "upRight"],
  [hashArray([UP, LEFT]), "upLeft"],

  [hashArray([RIGHT_D]), "right"],
  [hashArray([LEFT_A]), "left"],
  [hashArray([UP_W]), "up"],
  [hashArray([DOWN_S]), "down"],
  [hashArray([DOWN_S, RIGHT_D]), "downRight"],
  [hashArray([DOWN_S, LEFT_A]), "downLeft"],
  [hashArray([UP_W, RIGHT_D]), "upRight"],
  [hashArray([UP_W, LEFT_A]), "upLeft"],
]);

const loadImage = (src, callback = () => {}) => {
  const img = new Image();

  img.src = src;

  img.onload = () => {
    callback(img);
  };

  return img;
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
