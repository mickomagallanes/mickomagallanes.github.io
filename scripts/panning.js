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
    // Get the distance between the player and the edges of the canvas
    const distanceLeft = player.x - this.offsetX;
    const distanceRight = 1920 - (player.x + 48) - this.offsetX;
    const distanceTop = player.y - this.offsetY;
    const distanceBottom = 1080 - (player.y + 96) - this.offsetY;

    // Check if the player is within the panning radius near any canvas edge
    if (distanceLeft < this.radius) {
      this.offsetX -= this.speed;
      this.isPanning = true;
    } else if (distanceRight < this.radius) {
      this.offsetX += this.speed;
      this.isPanning = true;
    }

    if (distanceTop < this.radius) {
      this.offsetY -= this.speed;
      this.isPanning = true;
    } else if (distanceBottom < this.radius) {
      this.offsetY += this.speed;
      this.isPanning = true;
    }

    this.updatePannedMap();
  };

  updatePannedMap = () => {
    this.drawBackground(this.offsetX, this.offsetY);
  };
}
