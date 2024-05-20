class PlayerHitbox extends Hitbox {
  constructor() {
    super(PLAYER_WIDTH - 30, PLAYER_HEIGHT / 2 - 25);
  }

  setHitbox = (x, y) => {
    this.setCoord(x + 15, y + PLAYER_HEIGHT - 25);
    this.drawHitbox();
  };
}
