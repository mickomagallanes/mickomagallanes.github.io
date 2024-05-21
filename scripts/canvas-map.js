class CanvasMap {
  constructor() {
    this.minBorderX = 10;
    this.minBorderY = -40;
    this.maxBorderX = CANVAS_WIDTH - (PLAYER_WIDTH + 10);
    this.maxBorderY = CANVAS_HEIGHT - PLAYER_HEIGHT;
    this.isImageLoaded = false;

    this.image = loadImage("assets/img/background.png", () => {
      this.isImageLoaded = true;
    });

    this.bottomTrees = loadImage("assets/img/bottom-trees.png");
  }

  getIsImageLoaded = () => {
    return this.isImageLoaded;
  };

  drawBackground = (x = 0, y = 0) => {
    CONTEXT.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    CONTEXT.drawImage(this.image, x, y, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  drawFog = (playerX, playerY) => {
    // Define the center and radius of the reveal circle
    const centerX = playerX + PLAYER_WIDTH / 2;
    const centerY = playerY + PLAYER_HEIGHT / 2;
    const radius = 300;
    const centerRadius = 35;

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
    CONTEXT.drawImage(
      this.bottomTrees,
      0,
      CANVAS_HEIGHT - BOTTOM_TREES_HEIGHT,
      CANVAS_WIDTH,
      BOTTOM_TREES_HEIGHT
    );
  };

  drawMapMisc = (playerX, playerY) => {
    this.drawBottomTrees();
    this.drawFog(playerX, playerY);
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
