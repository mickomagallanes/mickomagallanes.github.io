class CanvasMap {
  constructor(context) {
    this.context = context;
    this.minBorderX = 10;
    this.minBorderY = -40;
    this.maxBorderX = 1920 - 48;
    this.maxBorderY = 1080 - 96;
  }

  drawBackground = (x = 0, y = 0) => {
    loadImage("assets/img/background.png", (img) => {
      this.context.drawImage(img, x, y, CANVAS_WIDTH, CANVAS_HEIGHT);
    });
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
