class DeathAnimation {
  constructor(image, imgWidth, imgHeight) {
    // x and y could be dynamic in the future, like a player who moves can die
    this.x = undefined;
    this.y = undefined;
    this.speed = 25;

    this.yLimit = -50;

    this.image = image;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;

    this.isDead = false;
    this.isCoordInit = false;
  }

  animateDeath = () => {
    if (!this.isDead) {
      CONTEXT.drawImage(
        this.image,
        this.x,
        this.y,
        this.imgWidth,
        this.imgHeight
      );
      this.y -= this.speed;

      if (this.y <= this.yLimit) {
        this.isDead = true;
      }
    }
  };

  initCoord = (x, y) => {
    if (!this.isCoordInit) {
      this.x = x;
      this.y = y;

      this.isCoordInit = true;
    }
  };
}
