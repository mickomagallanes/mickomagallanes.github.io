const allDir = [LEFT, RIGHT, UP, DOWN];

/**
 * if a key is down, the x/y-axis will be moved in animate
 */
class Keyboard {
  constructor() {
    this._keys = { [LEFT]: false, [RIGHT]: false, [UP]: false, [DOWN]: false };
  }

  listenForEvents = () => {
    window.addEventListener("keydown", this._onKeyDown);
    window.addEventListener("keyup", this._onKeyUp);
    window.addEventListener("touchstart", (event) => {
      event.preventDefault(); // Prevent default touch behavior (like scrolling)
      const touch = event.touches[0];
      // Handle touch input based on touch coordinates
      this.handleTouchInput(touch.clientX, touch.clientY);
    });

    // Detect touch move event
    window.addEventListener("touchmove", (event) => {
      event.preventDefault(); // Prevent default touch behavior (like scrolling)
      const touch = event.touches[0];
      // Handle touch input based on touch coordinates
      this.handleTouchInput(touch.clientX, touch.clientY);
    });

    window.addEventListener("touchend", (event) => {
      event.preventDefault(); // Prevent default touch behavior (like scrolling)
      // Stop animation when touch is lifted
      this.handleTouchUp();
    });
  };

  handleTouchInput(touchX, touchY) {
    this._keys[RIGHT] = true;
  }

  handleTouchUp(touchX, touchY) {
    this._keys[RIGHT] = false;
  }

  _onKeyDown = (event) => {
    const keyCode = event.keyCode;
    if (keyCode in this._keys) {
      event.preventDefault();
      this._keys[keyCode] = true;
    }
  };

  _onKeyUp = (event) => {
    const keyCode = event.keyCode;
    if (keyCode in this._keys) {
      event.preventDefault();
      this._keys[keyCode] = false;
    }
  };

  getAllDown = () => {
    return allDir.filter((direc) => this.isDown(direc));
  };

  isDown = (keyCode) => {
    return this._keys[keyCode];
  };
}
