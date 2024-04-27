class Game {
  constructor() {
    this.map = new CanvasMap();
    this.panning = new Panning();
    this.keyboard = new Keyboard();
    this.player = new Player(this.map);
  }

  init = () => {
    this.animate();
  };

  drawLoading = () => {
    CONTEXT.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // Draw dialogue text
    CONTEXT.fillStyle = "black";
    CONTEXT.font = `14px Arial`;
    CONTEXT.textAlign = "left";

    const loadingText = "Please wait, resources are still loading";

    const lineWidth = CONTEXT.measureText(loadingText).width;

    const screenXMax = getVisibleCanvasWidth();
    const screenYMax = getVisibleCanvasHeight();

    const centerX = screenXMax / 2 - lineWidth / 2;
    const centerY = screenYMax / 2;
    CONTEXT.fillText(
      "Please wait, resources are still loading",
      centerX,
      centerY
    );
  };

  animate = () => {
    if (this.map.getIsImageLoaded()) {
      this.keyboard.listenForEvents();
      this.map.drawBackground();

      // track player's position, pass it to pan (if canvas is too large, allow pan camera)
      // panning will be based on the player's position, with a huge offset radius
      this.panning.startPan(this.player, this.keyboard);
      this.player.trackMovement(this.keyboard);
      this.map.drawBottomTrees();
      this.map.drawFog();
      this.map.drawReveal(this.player.x, this.player.y);
    } else {
      this.drawLoading();
    }

    requestAnimationFrame(this.animate);
  };
}
