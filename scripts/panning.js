class Panning extends CanvasMap {
  constructor() {
    super();
    this.canvasPositionX = 0;
    this.canvasPositionY = 0;

    this.directionKeys = new Map([
      [hashArray([DOWN, RIGHT]), "downRight"],
      [hashArray([DOWN, LEFT]), "downLeft"],
      [hashArray([UP, RIGHT]), "upRight"],
      [hashArray([UP, LEFT]), "upLeft"],
    ]);
  }

  // TODO: refactor this into smaller
  startPan = (player, keyboard) => {
    const isRight = keyboard.isDown(RIGHT);
    const isLeft = keyboard.isDown(LEFT);
    const isDown = keyboard.isDown(DOWN);
    const isUp = keyboard.isDown(UP);

    const screenXMax = getVisibleCanvasWidth();
    const screenYMax = getVisibleCanvasHeight();
    const radiusX = screenXMax * 0.5;
    const radiusY = screenYMax * 0.5;
    let newX = this.canvasPositionX;
    let newY = this.canvasPositionY;

    const playerInCenterX =
      player.x + radiusX >= screenXMax && player.x + radiusX <= CANVAS_WIDTH;
    const playerInCenterY =
      player.y + radiusY >= screenYMax && player.y + radiusY <= CANVAS_HEIGHT;

    const keysPressed = keyboard.getAllDown().sort();
    const activeDirection = this.directionKeys.get(hashArray(keysPressed));
    const currentSpeed = activeDirection ? player.speedDiag : player.speed;

    if (playerInCenterX && player.previousX !== player.x) {
      if (isRight) {
        newX -= currentSpeed;
      } else if (isLeft) {
        newX += currentSpeed;
      }
    }

    if (playerInCenterY && player.previousY !== player.y) {
      if (isDown) {
        newY -= currentSpeed;
      } else if (isUp) {
        newY += currentSpeed;
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
    FOG_CANVAS.style.transform = `translate(${newX}px, ${newY}px)`;
    this.canvasPositionX = newX;
    this.canvasPositionY = newY;
  };

  getIsPanning = () => {
    return this.canvasPositionX !== 0 || this.canvasPositionY !== 0;
  };
}
