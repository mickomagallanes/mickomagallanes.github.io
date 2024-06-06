class Game {
  constructor() {
    this.map = new CanvasMap();
    this.keyboard = new Keyboard();
    this.player = new Player(this.map, this.keyboard);
    this.panning = new Panning(this.player, this.keyboard);
    this.resume = new Resume();
    this.bookWork = new Book(
      200,
      100,
      [
        {
          left: `
          <h3> Navix Health (Jan 2023 - May 2024) </h3>
          <img src="assets/img/navix.png" alt="Navix Health" loading="lazy" />
          <div> 
            <span class="pill">React</span>
            <span class="pill">Next.js 12</span>
            <span class="pill">HTML</span>
            <span class="pill">CSS</span>
            <span class="pill">Javascript</span>
            <span class="pill">Bootstrap</span>
            <span class="pill">SWR</span>
            <span class="pill">Zustand</span>
          </div>
          `,
          right: `<p>Developed and maintained pages and components. Investigated bugs found in production. 
          Refactored and applied coding principles to the existing old components. </p>
          <a href="https://navixhealth.com/" target="_blank"><i class="fa-solid fa-link"></i> Navix Health</a>`,
        },
        {
          left: `
          <h3> Phoenix Super LPG (July 2022 - January 2023) </h3>
          <img src="assets/img/phoenix.jpg" alt="Phoenix Super LPG" loading="lazy" />
          <div>
            <span class="pill">Angular</span>
            <span class="pill">HTML</span>
            <span class="pill">CSS</span>
            <span class="pill">Javascript</span>
            <span class="pill">Node.js</span>
            <span class="pill">Express</span>
            <span class="pill">Laravel</span>
          </div>
          `,
          right: `<p>Added features to the legacy administrator panel with Angular. 
          Converted the backend made in Node.js Express
          to Laravel. Created APIs for the mobile app with Laravel</p>`,
        },
      ],
      "assets/img/book-work.png",
      "Work Projects"
    );
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
    CONTEXT.fillStyle = "black";
    CONTEXT.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // Draw dialogue text
    CONTEXT.fillStyle = "white";
    CONTEXT.font = `16px Arial`;
    CONTEXT.textAlign = "left";

    const loadingText = "Please wait, resources are still loading";

    const lineWidth = CONTEXT.measureText(loadingText).width;

    const screenXMax = getVisibleCanvasWidth();
    const screenYMax = getVisibleCanvasHeight();

    const centerX = screenXMax / 2 - lineWidth / 2;
    const centerY = screenYMax / 2;
    CONTEXT.fillText(loadingText, centerX, centerY);
  };

  animate = () => {
    if (this.map.getIsImageLoaded()) {
      this.keyboard.listenForEvents();
      this.map.drawBackground();
      this.checkDeath("resume", () => this.resume.drawResume());
      this.bookWork.drawBook();
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

    if (
      this.player.playerHitbox.checkCollision(this.bookWork.hitbox) &&
      this.bookWork.bookModal.isInRange === false
    ) {
      this.bookWork.triggerModal();
      this.player.shouldStop = false;
    } else if (!this.player.playerHitbox.checkCollision(this.bookWork.hitbox)) {
      this.bookWork.bookModal.isInRange = false;
    } else if (this.bookWork.bookModal.isShown) {
      this.player.shouldStop = true;
    } else if (!this.bookWork.bookModal.isShown) {
      this.player.shouldStop = false;
    }
  };
}
