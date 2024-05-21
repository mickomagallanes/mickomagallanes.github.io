class Shine {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.radius = width; // Initial radius for the shine effect
    this.shineGrowing = true; // Flag to determine the direction of the shine
    this.maxRadius = width + width / 2; // Maximum radius for the shine effect
    this.minRadius = width / 2; // Minimum radius for the shine effect
    this.speed = 1;
  }

  drawShine = (x, y) => {
    const centerX = x + this.width / 2;
    const centerY = y + this.height / 2;

    const gradient = CONTEXT.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      this.radius
    );

    gradient.addColorStop(0, "rgba(255, 255, 255, 1)"); // Bright white at the center
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Fully transparent at the edge

    CONTEXT.save();
    CONTEXT.fillStyle = gradient;
    CONTEXT.beginPath();
    CONTEXT.arc(centerX, centerY, this.radius, 0, 2 * Math.PI);
    CONTEXT.fill();
    CONTEXT.restore();

    // Adjust the shine radius for animation
    if (this.shineGrowing) {
      this.radius += this.speed;
      if (this.radius >= this.maxRadius) {
        this.shineGrowing = false;
      }
    } else {
      this.radius -= this.speed;
      if (this.radius <= this.minRadius) {
        this.shineGrowing = true;
      }
    }
  };
}
