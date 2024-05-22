class Game {
  constructor() {
    this.map = new CanvasMap();
    this.keyboard = new Keyboard();
    this.player = new Player(this.map, this.keyboard);
    this.panning = new Panning(this.player, this.keyboard);
    this.resume = new Resume();
  }

  init = () => {
    this.animate();
  };

  adjustInstPos = (overlay) => {
    const screenWidth = getVisibleCanvasWidth();
    const screenHeight = getVisibleCanvasHeight();

    const centerX =
      screenWidth > CANVAS_WIDTH ? CANVAS_WIDTH / 2 : screenWidth / 2;

    const centerY =
      screenHeight > CANVAS_HEIGHT ? CANVAS_HEIGHT / 2 : screenHeight / 2;

    overlay.style.position = "absolute";
    overlay.style.left = `${centerX}px`;
    overlay.style.top = `${centerY}px`;
    overlay.style.transform = "translate(-50%, -50%)";
  };

  trackInstructions = () => {
    const overlay = document.getElementById("overlay");

    if (overlay) {
      if (this.keyboard.hasMoved) {
        overlay.remove();
      } else {
        this.adjustInstPos(overlay);

        const instructions = document.getElementById("instruction");
        overlay.style.display = "block";
        instructions.textContent = "Use WASD or arrow keys to move ";

        // Display different instructions for desktop and mobile
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          instructions.textContent = "Touch and drag to move";
        }

        overlay.appendChild(instructions);
      }
    }
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
      this.checkDeath("resume", () => this.resume.drawResume());

      // track player's position, pass it to pan (if canvas is too large, allow pan camera)
      // panning will be based on the player's position, with a huge offset radius
      this.player.trackMovement();
      this.panning.startPan();
      this.map.drawMapMisc(this.player.x, this.player.y);
      this.trackInstructions();
      this.checkCollision();
    } else {
      this.drawLoading();
    }

    requestAnimationFrame(this.animate);
  };

  checkDeath = (objClass, callback) => {
    if (this[objClass] && !this[objClass].deathAnimation.isDead) {
      callback();
    } else {
      this[objClass] = null;
    }
  };

  checkCollision = () => {
    if (
      this.resume &&
      !this.resume.deathAnimation.isCoordInit &&
      this.player.playerHitbox.checkCollision(this.resume.hitbox)
    ) {
      this.resume.triggerDownload();
      this.player.playerDialog.triggerResume();
    }
  };
}
