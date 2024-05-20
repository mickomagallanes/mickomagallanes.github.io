class PlayerSprite {
  constructor() {
    this.spriteWidth = PLAYER_WIDTH;
    this.spriteHeight = PLAYER_HEIGHT;
    this.animationFrames = 8;
    this.animationFrameCounter = 0;
    this.isImageLoaded = false;
    this.image = loadImage("assets/img/player.png", () => {
      this.isImageLoaded = true;
    });
    this.spriteAnimationFrames = 7;
    this.spriteAnimationCounter = 0;
    this.isReversing = false;

    this.spriteAnimation = {
      right: createDirections(2),
      left: createDirections(1),
      up: createDirections(3),
      down: createDirections(0),
      downRight: createDirectionsDiag(1),
      downLeft: createDirectionsDiag(0),
      upRight: createDirectionsDiag(3),
      upLeft: createDirectionsDiag(2),
    };

    this.spriteIdle = {
      right: { x: 1, y: 2 },
      down: { x: 7, y: 0 },
      left: { x: 1, y: 1 },
      up: { x: 1, y: 3 },
      downRight: { x: 4, y: 1 },
      downLeft: { x: 4, y: 0 },
      upRight: { x: 4, y: 3 },
      upLeft: { x: 4, y: 2 },
    };
  }

  calculateNextSprite = (isIdle) => {
    if (!isIdle) {
      // check animation buffer if ready to show next sprite
      if (this.animationFrameCounter + 1 >= this.animationFrames) {
        this.spriteAnimationCounter =
          (this.spriteAnimationCounter + 1) % this.spriteAnimationFrames;
      }

      this.animationFrameCounter =
        (this.animationFrameCounter + 1) % this.animationFrames;
    } else {
      this.animationFrameCounter = 0;
      this.spriteAnimationCounter = 0;
    }
  };

  drawPlayer = (sx, sy, newX, newY) => {
    if (this.isImageLoaded) {
      CONTEXT.drawImage(
        this.image,
        sx * this.spriteWidth,
        sy * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        newX,
        newY,
        this.spriteWidth,
        this.spriteHeight
      );
    }
  };

  getSpriteCoord = (isIdle, direction) => {
    const spriteObj = isIdle ? this.spriteIdle : this.spriteAnimation;

    const animationFrame = isIdle
      ? spriteObj[direction]
      : spriteObj[direction][this.spriteAnimationCounter];

    return animationFrame;
  };
}
