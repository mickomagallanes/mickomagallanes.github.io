class Player {
  constructor(context, map) {
    this.context = context;
    this.map = map;
    this.x = 50;
    this.y = 40;
    this.speed = 3;
    this.lastDirection = "down";
    this.playerSprite = new PlayerSprite(context);

    this.directionFormula = {
      right: { x: (num) => num + this.speed, y: (num) => num },
      left: { x: (num) => num - this.speed, y: (num) => num },
      up: { x: (num) => num, y: (num) => num - this.speed },
      down: { x: (num) => num, y: (num) => num + this.speed },
      downRight: { x: (num) => num + this.speed, y: (num) => num + this.speed },
      downLeft: { x: (num) => num - this.speed, y: (num) => num + this.speed },
      upRight: { x: (num) => num + this.speed, y: (num) => num - this.speed },
      upLeft: { x: (num) => num - this.speed, y: (num) => num - this.speed },
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

  animatePlayer = (isIdle, direction) => {
    this.lastDirection = direction;

    let tempX = isIdle ? this.x : this.directionFormula[direction].x(this.x);
    let tempY = isIdle ? this.y : this.directionFormula[direction].y(this.y);

    if (!this.map.isWithinBounds(tempX, tempY)) {
      tempX = this.x;
      tempY = this.y;
    } else {
      this.x = tempX;
      this.y = tempY;
    }

    const spriteCoord = this.playerSprite.getSpriteCoord(isIdle, direction);

    this.playerSprite.drawPlayer(spriteCoord.x, spriteCoord.y, tempX, tempY);

    this.playerSprite.calculateNextSprite(isIdle);
  };

  trackMovement = (keyboard) => {
    const keysPressed = keyboard.getAllDown().sort();
    const direction = this.directionKeys.get(hashArray(keysPressed));

    if (direction !== undefined) {
      this.animatePlayer(false, direction);
    } else {
      this.animatePlayer(true, this.lastDirection);
    }
  };
}
