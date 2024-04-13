class Game {
  constructor(context) {
    this.context = context;
    this.map = new CanvasMap(context);
    this.panning = new Panning();
  }

  init = () => {
    this.map.drawBackground();

    // track player's position, pass it to pan (if canvas is too large, allow pan camera)
    // panning will be based on the player's position, with a huge offset radius
    // this.panning.startPan();
    requestAnimationFrame(this.init);
  };
}
