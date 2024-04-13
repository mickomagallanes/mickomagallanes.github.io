const loadImage = (src) => {
  const img = new Image();

  img.src = src;
  return img;
};

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;
