const allDir = [LEFT, RIGHT, UP, DOWN, LEFT_A, RIGHT_D, UP_W, DOWN_S];
const initKeys = {
  [LEFT]: false,
  [RIGHT]: false,
  [UP]: false,
  [DOWN]: false,
  [LEFT_A]: false,
  [RIGHT_D]: false,
  [UP_W]: false,
  [DOWN_S]: false,
};

/**
 * if a key is down, the x/y-axis will be moved in animate
 */
class Keyboard {
  constructor() {
    this.keys = { ...initKeys };
    this.diagonalBuffer = 45; // a buffer to determine if touch start is diagonal on touch move
    this.prevTouchX = null;
    this.prevTouchY = null;
    this.touchCounter = 0;
    this.hasMoved = false;
  }

  listenForEvents = () => {
    window.addEventListener("keydown", this.onKeyEvent);
    window.addEventListener("keyup", this.onKeyEvent);
    window.addEventListener("touchstart", this.onTouchStart);
    window.addEventListener("touchmove", this.onTouchMove);
    window.addEventListener("touchend", this.onTouchEnd);
    window.addEventListener("visibilitychange", this.resetKeys);
    window.addEventListener("blur", this.resetKeys);
    window.addEventListener("focus", this.resetKeys);
  };

  resetKeys = () => {
    this.keys = { ...initKeys };
  };

  setHasMoved = () => {
    if (!this.hasMoved) {
      this.hasMoved = true;
    }
  };

  onKeyEvent = (event) => {
    const keyCode = event.keyCode;
    if (keyCode in this.keys) {
      event.preventDefault();
      this.setHasMoved();
      if (event.type === "keydown") {
        this.keys[keyCode] = true;
      } else if (event.type === "keyup") {
        this.keys[keyCode] = false;
      }
    }
  };

  onTouchStart = (event) => {
    event.preventDefault();
    this.setHasMoved();
    const touch = event.touches[0];
    this.prevTouchX = touch.clientX;
    this.prevTouchY = touch.clientY;
  };

  onTouchMove = (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    this.updateTouchDirection(touch.clientX, touch.clientY);
  };

  onTouchEnd = (event) => {
    event.preventDefault();
    // Clear touch direction when touch is lifted
    this.prevTouchX = null;
    this.prevTouchY = null;
    this.resetKeys();
  };

  updateTouchDirection = (touchX, touchY) => {
    if (this.prevTouchX !== null && this.prevTouchY !== null) {
      const deltaX = touchX - this.prevTouchX;
      const deltaY = touchY - this.prevTouchY;

      // compare current touch to prev if has significant direction change, with diagonal buffer
      const significantX = Math.abs(deltaX) > this.diagonalBuffer;
      const significantY = Math.abs(deltaY) > this.diagonalBuffer;

      if (significantX || significantY) {
        // set if a key is active
        this.keys[RIGHT] = deltaX > 0 && significantX;
        this.keys[LEFT] = deltaX < 0 && significantX;
        this.keys[UP] = deltaY < 0 && significantY;
        this.keys[DOWN] = deltaY > 0 && significantY;

        // to prevent stopping when going back to original touch pos
        if (this.touchCounter === 10) {
          this.prevTouchX = touchX;
          this.prevTouchY = touchY;
          this.touchCounter = 0;
        } else {
          this.touchCounter++;
        }
      }
    }
  };

  getAllDown = () => {
    return allDir.filter((direc) => this.isDown(direc));
  };

  isDown = (keyCode) => {
    return this.keys[keyCode];
  };
}
