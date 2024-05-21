class Panning extends CanvasMap {
  constructor(player, keyboard) {
    super();
    this.player = player;
    this.keyboard = keyboard;
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

  startPan = () => {
    let newX = this.canvasPositionX;
    let newY = this.canvasPositionY;

    // Boundary checks to ensure the canvas position doesn't go out of bounds
    const visibleScreenWidth = getVisibleCanvasWidth();
    const visibleScreenHeight = getVisibleCanvasHeight();

    const screenCenterX = visibleScreenWidth / 2;
    const screenCenterY = visibleScreenHeight / 2;

    const playerInCenterX =
      this.player.x >= screenCenterX &&
      this.player.x <= CANVAS_WIDTH - screenCenterX;
    const playerInCenterY =
      this.player.y >= screenCenterY &&
      this.player.y <= CANVAS_HEIGHT - screenCenterY;

    const keysPressed = this.keyboard.getAllDown().sort();
    const activeDirection = DIRECTION_KEYS.get(hashArray(keysPressed));

    const hasXChanged = this.player.previousX !== this.player.x;
    const hasYChanged = this.player.previousY !== this.player.y;

    if (activeDirection) {
      // if player in is center, and player changes its position, then proceed
      if (playerInCenterX && hasXChanged) {
        newX = this.directionFormula[activeDirection].x(newX);
      } else if (this.player.x < screenCenterX && hasXChanged) {
        newX = 0;
      } else if (this.player.x > CANVAS_HEIGHT - screenCenterX && hasXChanged) {
        newX = visibleScreenWidth - CANVAS_WIDTH;
      }

      // if player in is center, and player changes its position, then proceed
      if (playerInCenterY && this.player.previousY !== this.player.y) {
        newY = this.directionFormula[activeDirection].y(newY);
      } else if (this.player.y < screenCenterY && hasYChanged) {
        newY = 0;
      } else if (this.player.y > CANVAS_HEIGHT - screenCenterY && hasYChanged) {
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
