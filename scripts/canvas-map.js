class CanvasMap {
  constructor(context) {
    this.context = context;
    this.minBorderX = 10;
    this.minBorderY = -40;
    this.maxBorderX = CANVAS_WIDTH - SPRITE_WIDTH;
    this.maxBorderY = CANVAS_HEIGHT - SPRITE_HEIGHT;
    this.isImageLoaded = false;
    this.image = loadImage("assets/img/background.png", () => {
      this.isImageLoaded = true;
    });
  }

  drawBackground = (x = 0, y = 0) => {
    if (this.isImageLoaded) {
      this.context.drawImage(this.image, x, y, CANVAS_WIDTH, CANVAS_HEIGHT);
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
