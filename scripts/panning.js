class Panning extends CanvasMap {
  constructor(context) {
    super(context);
    this.radius = 700;
    this.canvas = document.getElementById("game");
    this.canvasPositionX = 0;
    this.canvasPositionY = 0;
  }

  // TODO: fix panning
  startPan = (player, keyboard) => {
    const isRight = keyboard.isDown(RIGHT);
    const isLeft = keyboard.isDown(LEFT);
    const isDown = keyboard.isDown(DOWN);
    const isUp = keyboard.isDown(UP);
    const screenXMax = getVisibleCanvasWidth();
    const screenYMax = getVisibleCanvasHeight();

    // Update canvas position based on pan direction
    let newX = this.canvasPositionX;
    let newY = this.canvasPositionY;

    if (
      isRight &&
      player.x + this.radius >= screenXMax &&
      player.x + this.radius <= CANVAS_WIDTH
    ) {
      newX -= player.speed;
    }
    if (
      isLeft &&
      player.x - this.radius <= CANVAS_WIDTH - screenXMax &&
      player.x - this.radius >= 0
    ) {
      newX += player.speed;
    }
    if (
      isDown &&
      player.y + this.radius >= screenYMax &&
      player.y + this.radius <= CANVAS_HEIGHT
    ) {
      newY -= player.speed;
    }
    if (
      isUp &&
      player.y - this.radius <= CANVAS_HEIGHT - screenYMax &&
      player.y - this.radius >= 0
    ) {
      newY += player.speed;
    }

    // Update canvas transform
    this.canvas.style.transform = `translate(${newX}px, ${newY}px)`;
    this.canvasPositionX = newX;
    this.canvasPositionY = newY;
  };

  getIsPanning = () => {
    return this.canvasPositionX !== 0 || this.canvasPositionY !== 0;
  };
}
