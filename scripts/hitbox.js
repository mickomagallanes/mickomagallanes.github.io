class Hitbox {
  constructor(width, height) {
    this.minX = 0;
    this.minY = 0;
    this.width = width;
    this.height = height;
  }

  //test
  checkCollision = (otherHitbox) => {
    return (
      this.minX < otherHitbox.minX + otherHitbox.width &&
      this.minY < otherHitbox.minY + otherHitbox.height &&
      this.minX + this.width > otherHitbox.minX &&
      this.minY + this.height > otherHitbox.minY
    );
  };

  setCoord = (x1, x2) => {
    this.minX = x1;
    this.minY = x2;
  };

  drawHitbox = () => {
    CONTEXT.beginPath();
    CONTEXT.rect(this.minX, this.minY, this.width, this.height);
    CONTEXT.fillStyle = "green";
    CONTEXT.stroke();
  };
}
