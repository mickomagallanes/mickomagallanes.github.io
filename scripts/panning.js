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
    let newX = this.canvasPositionX;
    let newY = this.canvasPositionY;

    // Boundary checks to ensure the canvas position doesn't go out of bounds
    const visibleScreenWidth = getVisibleCanvasWidth();
    const visibleScreenHeight = getVisibleCanvasHeight();

    const screenCenterX = visibleScreenWidth / 2;
    const screenCenterY = visibleScreenHeight / 2;

    const playerInCenterX =
      player.x >= screenCenterX && player.x <= CANVAS_WIDTH - screenCenterX;
    const playerInCenterY =
      player.y >= screenCenterY && player.y <= CANVAS_HEIGHT - screenCenterY;

    const keysPressed = keyboard.getAllDown().sort();
    const activeDirection = DIRECTION_KEYS.get(hashArray(keysPressed));

    const hasXChanged = player.previousX !== player.x;
    const hasYChanged = player.previousY !== player.y;

    if (activeDirection) {
      // if player in is center, and player changes its position, then proceed
      if (playerInCenterX && hasXChanged) {
        newX = this.directionFormula[activeDirection].x(newX);
      } else if (player.x < screenCenterX && hasXChanged) {
        newX = 0;
      } else if (player.x > CANVAS_HEIGHT - screenCenterX && hasXChanged) {
        newX = visibleScreenWidth - CANVAS_WIDTH;
      }

      // if player in is center, and player changes its position, then proceed
      if (playerInCenterY && player.previousY !== player.y) {
        newY = this.directionFormula[activeDirection].y(newY);
      } else if (player.y < screenCenterY && hasYChanged) {
        newY = 0;
      } else if (player.y > CANVAS_HEIGHT - screenCenterY && hasYChanged) {
        newY = visibleScreenHeight - CANVAS_HEIGHT;
      }
    }

    // Ensure newX stays within the allowed range
    newX = Math.min(0, Math.max(newX, visibleScreenWidth - CANVAS_WIDTH));

    // Ensure newY stays within the allowed range
    newY = Math.min(0, Math.max(newY, visibleScreenHeight - CANVAS_HEIGHT));

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
