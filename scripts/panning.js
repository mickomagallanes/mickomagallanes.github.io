class Panning extends CanvasMap {
  constructor() {
    super();
    this.canvasPositionX = 0;
    this.canvasPositionY = 0;
    this.speed = 4;
    this.speedDiag = 3;

    this.directionFormula = {
      right: { x: (num) => num - this.speed, y: (num) => num },
      left: { x: (num) => num + this.speed, y: (num) => num },
      up: { x: (num) => num, y: (num) => num + this.speed },
      down: { x: (num) => num, y: (num) => num - this.speed },
      downRight: {
        x: (num) => num - this.speedDiag,
        y: (num) => num - this.speedDiag,
      },
      downLeft: {
        x: (num) => num + this.speedDiag,
        y: (num) => num - this.speedDiag,
      },
      upRight: {
        x: (num) => num - this.speedDiag,
        y: (num) => num + this.speedDiag,
      },
      upLeft: {
        x: (num) => num + this.speedDiag,
        y: (num) => num + this.speedDiag,
      },
    };
  }

  startPan = (player, keyboard) => {
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
    const activeDirection = DIRECTION_KEYS.get(hashArray(keysPressed));

    if (activeDirection) {
      // if player in is center, and player changes its position, then proceed
      if (playerInCenterX && player.previousX !== player.x) {
        newX = this.directionFormula[activeDirection].x(newX);
      }

      // if player in is center, and player changes its position, then proceed
      if (playerInCenterY && player.previousY !== player.y) {
        newY = this.directionFormula[activeDirection].y(newY);
      }
    }

    // if new panning position exceeds canvas, then don't proceed
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
