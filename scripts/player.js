class Player {
  constructor(context) {
    this.context = context;
    this.yBuffer = 12;
    this.spriteWidth = 48;
    this.spriteHeight = 96;
    this.animationFrames = 8;
    this.animationFrameCounter = 0;
    this.x = 0;
    this.y = 0;
    this.speed = 2;
    this.image = loadImage("assets/img/player.png");
    this.spriteAnimationFrames = 10;
    this.spriteAnimationCounter = 0;
    this.lastDirection = "down";

    this.spriteAnimation = {
      right: [
        { x: this.spriteWidth * 6, y: this.spriteHeight * 2 },
        { x: this.spriteWidth * 0, y: this.spriteHeight * 2 },
        { x: this.spriteWidth * 1, y: this.spriteHeight * 2 },
        { x: this.spriteWidth * 7, y: this.spriteHeight * 2 },
        { x: this.spriteWidth * 8, y: this.spriteHeight * 2 },
        { x: this.spriteWidth * 2, y: this.spriteHeight * 2 },
        { x: this.spriteWidth * 8, y: this.spriteHeight * 2 },
        { x: this.spriteWidth * 7, y: this.spriteHeight * 2 },
        { x: this.spriteWidth * 1, y: this.spriteHeight * 2 },
        { x: this.spriteWidth * 0, y: this.spriteHeight * 2 },
        { x: this.spriteWidth * 6, y: this.spriteHeight * 2 },
      ],
    };
    this.spriteIdle = {
      right: { x: this.spriteWidth * 1, y: this.spriteHeight * 2 },
      down: { x: this.spriteWidth * 7, y: this.spriteHeight * 0 },
    };

    this.directionFormula = {
      right: { x: (num) => num + this.speed, y: (num) => num },
    };
  }

  drawPlayer = (sx, sy, dx, dy) => {
    this.x = dx;
    this.y = dy;
    this.context.drawImage(
      this.image,
      sx,
      sy,
      this.spriteWidth,
      this.spriteHeight,
      dx,
      dy,
      this.spriteWidth,
      this.spriteHeight
    );
  };

  // TODO: refactor, DRY
  animatePlayer = (isIdle, direction) => {
    const spriteObj = isIdle ? this.spriteIdle : this.spriteAnimation;
    this.lastDirection = direction;

    if (isIdle) {
      this.animationFrameCounter = 0;
      this.spriteAnimationCounter = 0;

      this.drawPlayer(
        spriteObj[direction].x,
        spriteObj[direction].y,
        this.x,
        this.y
      );
    } else {
      const tempX = this.directionFormula[direction].x(this.x);
      const tempY = this.directionFormula[direction].y(this.y);

      if (this.animationFrameCounter < this.animationFrames) {
        this.drawPlayer(
          spriteObj[direction][this.spriteAnimationCounter].x,
          spriteObj[direction][this.spriteAnimationCounter].y,
          tempX,
          tempY
        );

        this.animationFrameCounter++;
      } else {
        this.animationFrameCounter = 0;
        if (this.spriteAnimationCounter < this.spriteAnimationFrames) {
          this.spriteAnimationCounter += 1;
        } else {
          this.spriteAnimationCounter = 0;
        }
        this.drawPlayer(
          spriteObj[direction][this.spriteAnimationCounter].x,
          spriteObj[direction][this.spriteAnimationCounter].y,
          tempX,
          tempY
        );
      }
    }
  };

  trackPlayer = (keyboard) => {
    if (keyboard.isDown(RIGHT)) {
      this.animatePlayer(false, "right");
    } else {
      this.animatePlayer(true, "down");
    }
  };
}
