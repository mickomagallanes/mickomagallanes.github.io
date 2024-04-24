class Player {
  constructor(map) {
    this.map = map;
    this.x = 50;
    this.y = 40;
    this.speed = 4;
    this.speedDiag = 3;
    this.lastDirection = "down";
    this.playerSprite = new PlayerSprite();
    this.previousX = 0;
    this.previousY = 0;

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

    this.directionKeys = new Map([
      [hashArray([RIGHT]), "right"],
      [hashArray([LEFT]), "left"],
      [hashArray([UP]), "up"],
      [hashArray([DOWN]), "down"],
      [hashArray([DOWN, RIGHT]), "downRight"],
      [hashArray([DOWN, LEFT]), "downLeft"],
      [hashArray([UP, RIGHT]), "upRight"],
      [hashArray([UP, LEFT]), "upLeft"],
    ]);
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
  };

  trackMovement = (keyboard) => {
    const keysPressed = keyboard.getAllDown().sort();
    const activeDirection = this.directionKeys.get(hashArray(keysPressed));
    this.previousX = this.x;
    this.previousY = this.y;
    
    if (activeDirection !== undefined) {
      this.movePlayer(activeDirection);

      this.animatePlayer(false, activeDirection);
      this.lastDirection = activeDirection;
    } else {
      this.animatePlayer(true);
    }
  };
}
