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

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;
const SPRITE_WIDTH = 48;
const SPRITE_HEIGHT = 96;
