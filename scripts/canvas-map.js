class CanvasMap {
  constructor() {
    this.minBorderX = 10;
    this.minBorderY = -40;
    this.maxBorderX = CANVAS_WIDTH - SPRITE_WIDTH;
    this.maxBorderY = CANVAS_HEIGHT - SPRITE_HEIGHT;
    this.isImageLoaded = false;

    this.image = loadImage("assets/img/background.png", () => {
      this.isImageLoaded = true;
    });

    this.bottomTrees = loadImage("assets/img/bottom-trees.png");
  }

  drawBackground = (x = 0, y = 0) => {
    CONTEXT.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (this.isImageLoaded) {
      CONTEXT.drawImage(this.image, x, y, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  };

  drawFog = () => {
    // Set fill style for the fog
    FOG_CONTEXT.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    FOG_CONTEXT.fillStyle = "rgba(0, 0, 0)";

    // Fill the fog canvas with the fog color
    FOG_CONTEXT.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  drawReveal = (playerX, playerY) => {
    // Define the center and radius of the reveal circle
    const centerX = playerX + SPRITE_WIDTH / 2;
    const centerY = playerY + SPRITE_HEIGHT / 2;
    const radius = 250;
    const centerRadius = 25;

    // Create a radial gradient
    const gradient = FOG_CONTEXT.createRadialGradient(
      centerX,
      centerY,
      centerRadius,
      centerX,
      centerY,
      radius
    );

    // Define gradient colors and stops
    gradient.addColorStop(0, "rgba(0, 0, 0, 0)"); // Transparent at the center
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)"); // Opaque at the edge

    // Set the fill style to the radial gradient
    FOG_CONTEXT.fillStyle = gradient;

    // Clear the fog canvas
    FOG_CONTEXT.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Fill the fog canvas with the radial gradient, revealing the area around the player
    FOG_CONTEXT.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  drawBottomTrees = () => {
    if (this.isImageLoaded) {
      CONTEXT.drawImage(
        this.bottomTrees,
        0,
        CANVAS_HEIGHT - BOTTOM_TREES_HEIGHT,
        CANVAS_WIDTH,
        BOTTOM_TREES_HEIGHT
      );
    }
  };

  isWithinBounds = (x, y) => {
    // Check if the next position is within the boundaries
    return (
      x >= this.minBorderX &&
      x <= this.maxBorderX &&
      y >= this.minBorderY &&
      y <= this.maxBorderY
    );
  };
}
