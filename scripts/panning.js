class Panning extends CanvasMap {
  constructor(context) {
    super(context);
    this.isPanning = false;
    this.startX = 0;
    this.startY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.radius = 400;
    this.speed = 2;
  }

  startPan = (keyboard, player) => {
    if (keyboard.isDown(RIGHT)) {
      const dx = this.speed - this.startX;
      // const dy = 1 - this.startY;
      this.offsetX -= dx;
      // this.offsetY += dy;
      this.startX = dx;
      // this.startY = 1;
      this.isPanning = true;
    }

    this.updatePannedMap();
  };

  updatePannedMap = () => {
    this.drawBackground(this.offsetX, this.offsetY);
  };
}
