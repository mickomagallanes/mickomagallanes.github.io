class Game {
  constructor(context) {
    this.context = context;
    this.map = new CanvasMap(context);
    this.panning = new Panning(context);
    this.keyboard = new Keyboard();
    this.player = new Player(context, this.map);
  }

  init = () => {
    this.animate();
  };

  animate = () => {
    this.keyboard.listenForEvents();
    // this.panning.startPan(this.player);
    this.map.drawBackground();
    this.player.trackMovement(this.keyboard);

    // track player's position, pass it to pan (if canvas is too large, allow pan camera)
    // panning will be based on the player's position, with a huge offset radius
    // this.panning.startPan();
    requestAnimationFrame(this.animate);
  };
}
