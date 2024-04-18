class PlayerSprite {
  constructor(context) {
    this.context = context;
    this.spriteWidth = 48;
    this.spriteHeight = 96;
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
      right: [
        { x: 7, y: 2 },
        { x: 0, y: 2 },
        { x: 6, y: 2 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 8, y: 2 },
        { x: 2, y: 2 },
      ],
      left: [
        { x: 7, y: 1 },
        { x: 0, y: 1 },
        { x: 6, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 8, y: 1 },
        { x: 2, y: 1 },
      ],
      up: [
        { x: 7, y: 3 },
        { x: 0, y: 3 },
        { x: 6, y: 3 },
        { x: 0, y: 3 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 8, y: 3 },
        { x: 2, y: 3 },
      ],
      down: [
        { x: 7, y: 0 },
        { x: 0, y: 0 },
        { x: 6, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 8, y: 0 },
        { x: 2, y: 0 },
      ],
      downRight: [
        { x: 4, y: 1 },
        { x: 3, y: 1 },
        { x: 11, y: 1 },
        { x: 3, y: 1 },
        { x: 4, y: 1 },
        { x: 5, y: 1 },
        { x: 9, y: 1 },
        { x: 5, y: 1 },
      ],
      downLeft: [
        { x: 4, y: 0 },
        { x: 3, y: 0 },
        { x: 11, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 9, y: 0 },
        { x: 5, y: 0 },
      ],
      upRight: [
        { x: 4, y: 3 },
        { x: 3, y: 3 },
        { x: 11, y: 3 },
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 5, y: 3 },
        { x: 9, y: 3 },
        { x: 5, y: 3 },
      ],
      upLeft: [
        { x: 4, y: 2 },
        { x: 3, y: 2 },
        { x: 11, y: 2 },
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 5, y: 2 },
        { x: 9, y: 2 },
        { x: 5, y: 2 },
      ],
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

  calculateNextSprite(isIdle) {
    if (!isIdle) {
      this.spriteAnimationCounter =
        (this.spriteAnimationCounter +
          (this.animationFrameCounter + 1 < this.animationFrames ? 0 : 1)) %
        this.spriteAnimationFrames;

      this.animationFrameCounter =
        (this.animationFrameCounter + 1) % this.animationFrames;
    } else {
      this.animationFrameCounter = 0;
      this.spriteAnimationCounter = 0;
    }
  }

  drawPlayer = (sx, sy, newX, newY) => {
    if (this.isImageLoaded) {
      this.context.drawImage(
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

  getSpriteCoord(isIdle, direction) {
    const spriteObj = isIdle ? this.spriteIdle : this.spriteAnimation;

    const animationFrame = isIdle
      ? spriteObj[direction]
      : spriteObj[direction][this.spriteAnimationCounter];

    return animationFrame;
  }
}
