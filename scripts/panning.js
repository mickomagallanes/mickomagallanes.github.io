class Panning extends CanvasMap {
  constructor() {
    super();
    this.canvasPositionX = 0;
    this.canvasPositionY = 0;
  }

  // TODO: refactor this
  startPan = (player, keyboard) => {
    const isRight = keyboard.isDown(RIGHT);
    const isLeft = keyboard.isDown(LEFT);
    const isDown = keyboard.isDown(DOWN);
    const isUp = keyboard.isDown(UP);

    const screenXMax = getVisibleCanvasWidth();
    const screenYMax = getVisibleCanvasHeight();
    const radiusX = screenXMax * 0.5;
    const radiusY = screenYMax * 0.5;

    const playerInCenterX =
      player.x + radiusX >= screenXMax && player.x + radiusX <= CANVAS_WIDTH;
    const playerInCenterY =
      player.y + radiusY >= screenYMax && player.y + radiusY <= CANVAS_HEIGHT;

    let newX = this.canvasPositionX;
    let newY = this.canvasPositionY;

    if (playerInCenterX) {
      if (isRight) {
        newX -= player.speed;
      } else if (isLeft) {
        newX += player.speed;
      }
    }

    if (playerInCenterY) {
      if (isDown) {
        newY -= player.speed;
      } else if (isUp) {
        newY += player.speed;
      }
    }

    if (Math.abs(newX) + screenXMax >= CANVAS_WIDTH || newX > 0) {
      newX = this.canvasPositionX;
    }

    if (Math.abs(newY) + screenYMax >= CANVAS_HEIGHT || newY > 0) {
      newY = this.canvasPositionY;
    }
    // Update canvas transform
    CANVAS.style.transform = `translate(${newX}px, ${newY}px)`;
    this.canvasPositionX = newX;
    this.canvasPositionY = newY;
  };

  getIsPanning = () => {
    return this.canvasPositionX !== 0 || this.canvasPositionY !== 0;
  };
}
