class Player {
  constructor(map, keyboard) {
    this.map = map;
    this.keyboard = keyboard;
    this.x = 140;
    this.y = 140;
    this.speed = 4;
    this.speedDiag = 3;
    this.lastDirection = "down";
    this.playerSprite = new PlayerSprite();
    this.playerDialog = new PlayerDialog();
    this.playerHitbox = new PlayerHitbox();
    this.previousX = 0;
    this.previousY = 0;
    this.shouldStop = false;

    this.directionFormula = {
      right: { x: (num) => num + this.speed, y: (num) => num },
      left: { x: (num) => num - this.speed, y: (num) => num },
      up: { x: (num) => num, y: (num) => num - this.speed },
      down: { x: (num) => num, y: (num) => num + this.speed },
      downRight: {
        x: (num) => num + this.speedDiag,
        y: (num) => num + this.speedDiag,
      },
      downLeft: {
        x: (num) => num - this.speedDiag,
        y: (num) => num + this.speedDiag,
      },
      upRight: {
        x: (num) => num + this.speedDiag,
        y: (num) => num - this.speedDiag,
      },
      upLeft: {
        x: (num) => num - this.speedDiag,
        y: (num) => num - this.speedDiag,
      },
    };
  }

  movePlayer = (direction) => {
    let tempX = this.directionFormula[direction].x(this.x);
    let tempY = this.directionFormula[direction].y(this.y);

    if (!this.map.isWithinBounds(tempX, tempY)) {
      return; // Do not move if next position is outside map bounds
    }

    this.x = tempX;
    this.y = tempY;
  };

  animatePlayer = (isIdle, direction) => {
    const spriteCoord = isIdle
      ? this.playerSprite.getSpriteCoord(true, this.lastDirection)
      : this.playerSprite.getSpriteCoord(false, direction);

    this.playerSprite.drawPlayer(spriteCoord.x, spriteCoord.y, this.x, this.y);

    this.playerSprite.calculateNextSprite(isIdle);

    this.playerDialog.trackDialog(this.x, this.y);
    this.playerHitbox.setHitbox(this.x, this.y);
  };

  trackMovement = () => {
    const keysPressed = this.keyboard.getAllDown().sort();
    const activeDirection = DIRECTION_KEYS.get(hashArray(keysPressed));
    this.previousX = this.x;
    this.previousY = this.y;

    if (activeDirection !== undefined && !this.shouldStop) {
      this.movePlayer(activeDirection);

      this.animatePlayer(false, activeDirection);
      this.lastDirection = activeDirection;
    } else {
      this.animatePlayer(true);
    }
  };
}
