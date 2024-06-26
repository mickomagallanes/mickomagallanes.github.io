class Resume {
  constructor() {
    this.spawnMinX = 1500;
    this.spawnMaxX = 1700;
    this.spawnMinY = 640;
    this.spawnMaxY = 780;
    this.x = randomizeNumber(this.spawnMinX, this.spawnMaxX);
    this.y = randomizeNumber(this.spawnMinY, this.spawnMaxY);

    this.isImageLoaded = false;

    this.hitbox = new Hitbox(RESUME_WIDTH, RESUME_HEIGHT);

    this.image = loadImage("assets/img/resume.png", () => {
      this.isImageLoaded = true;
    });

    this.deathAnimation = new DeathAnimation(
      this.image,
      RESUME_WIDTH,
      RESUME_HEIGHT
    );

    this.shine = new Shine(RESUME_WIDTH, RESUME_HEIGHT);
  }

  drawResume = () => {
    if (!this.deathAnimation.isCoordInit && !this.deathAnimation.isDead) {
      this.shine.drawShine(this.x, this.y);

      CONTEXT.drawImage(
        this.image,
        this.x,
        this.y,
        RESUME_WIDTH,
        RESUME_HEIGHT
      );
      this.hitbox.setCoord(this.x, this.y);

      //   this.hitbox.drawHitbox(); // for dev purposes
    } else {
      this.deathAnimation.animateDeath(this.x, this.y);
    }
  };

  triggerDownload = () => {
    if (!this.deathAnimation.isCoordInit) {
      const link = document.createElement("a");
      link.href = "assets/files/resume.pdf";
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.deathAnimation.initCoord(this.x, this.y);
    }
  };
}
