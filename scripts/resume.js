class Resume {
  constructor(map) {
    this.map = map;
    this.x = 0;
    this.y = 0;
  }

  initPos = () => {
    this.x = this.randomizePos(this.map.minBorderX);
    this.y = this.randomizePos(this.map.minBorderY);
  };

  randomizePos = (min, max) => {
    return Math.random() * (max - min) + min;
  };
}
