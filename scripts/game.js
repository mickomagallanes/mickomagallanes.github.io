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

  animate = () => {
    this.keyboard.listenForEvents();
    this.map.drawBackground();

    // track player's position, pass it to pan (if canvas is too large, allow pan camera)
    // panning will be based on the player's position, with a huge offset radius
    this.panning.startPan(this.player, this.keyboard);
    this.player.trackMovement(this.keyboard);
    this.map.drawBottomTrees();
    this.map.drawFog();
    this.map.drawReveal(this.player.x, this.player.y);

    requestAnimationFrame(this.animate);
  };
}
