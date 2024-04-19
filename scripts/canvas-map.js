class CanvasMap {
  constructor() {
    this.minBorderX = 10;
    this.minBorderY = -40;
    this.maxBorderX = CANVAS_WIDTH - SPRITE_WIDTH;
    this.maxBorderY = CANVAS_HEIGHT - SPRITE_HEIGHT;
    this.isImageLoaded = false;
    this.image = loadImage("assets/img/background.png", () => {
      this.isImageLoaded = true;
    });

    this.bottomTrees = loadImage("assets/img/bottom-trees.png");
  }

  drawBackground = (x = 0, y = 0) => {
    if (this.isImageLoaded) {
      CONTEXT.drawImage(this.image, x, y, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  };

  drawBottomTrees = () => {
    if (this.isImageLoaded) {
      CONTEXT.drawImage(
        this.bottomTrees,
        0,
        CANVAS_HEIGHT - SPRITE_HEIGHT / 2,
        CANVAS_WIDTH,
        69
      );
    }
  };

  isWithinBounds = (x, y) => {
    // Check if the next position is within the boundaries
    return (
      x >= this.minBorderX &&
      x <= this.maxBorderX &&
      y >= this.minBorderY &&
      y <= this.maxBorderY
    );
  };
}
