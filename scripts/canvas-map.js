class CanvasMap {
  constructor(context) {
    this.context = context;
  }

  drawBackground = (x = 0, y = 0) => {
    const backgroundImg = loadImage("assets/img/background.jpg");
    backgroundImg.onload = () => {
      this.context.drawImage(backgroundImg, x, y, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
  };
}
