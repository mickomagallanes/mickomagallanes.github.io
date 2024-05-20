class Resume {
  constructor() {
    this.spawnMinX = 1500;
    this.spawnMaxX = 1800;
    this.spawnMinY = 640;
    this.spawnMaxY = CANVAS_HEIGHT - BOTTOM_TREES_HEIGHT;
    this.x = this.randomizePos(this.spawnMinX, this.spawnMaxX);
    this.y = this.randomizePos(this.spawnMinY, this.spawnMaxY);
    this.isImageLoaded = false;

    this.hitbox = new Hitbox(RESUME_WIDTH, RESUME_HEIGHT);

    this.image = loadImage("assets/img/resume.png", () => {
      this.isImageLoaded = true;
    });
  }

  randomizePos = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  drawResume = () => {
    CONTEXT.drawImage(this.image, this.x, this.y, RESUME_WIDTH, RESUME_HEIGHT);
    this.hitbox.setCoord(this.x, this.y);
    this.hitbox.drawHitbox();
  };

  triggerDownload = () => {
    const link = document.createElement("a");
    link.href = "assets/files/resume.pdf";
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
}
