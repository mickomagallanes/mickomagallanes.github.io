class Panning extends CanvasMap {
  constructor() {
    super();
    this.isPanning = false;
    this.startX;
    this.startY;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  endPan() {
    this.isPanning = false;
  }

  startPan(x, y) {
    if (this.offsetX < CANVAS_WIDTH && this.offsetY < CANVAS_HEIGHT) {
      const dx = x - this.startX;
      const dy = y - this.startY;
      this.offsetX += dx;
      this.offsetY += dy;
      this.startX = x;
      this.startY = y;
    }
  }

  updatePannedMap() {
    // Clear the canvas
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.drawBackground(-this.offsetX, -this.offsetY);
  }
}
