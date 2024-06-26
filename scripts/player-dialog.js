class PlayerDialog extends Dialog {
  constructor() {
    super();
    this.dialogLines = new Map([
      [
        "init",
        [
          "Where am I?",
          "This place looks oblivious",
          "*dizzy* Who brought me here!?",
          "Ang dilim naman dito",
          "Saan 'to? Gusto ko na umuwi",
        ],
      ],
      [
        "resume",
        [
          "Oh, there's my resume!",
          "A piece of paper about me...",
          "Take care of it, please",
        ],
      ],
      [
        "bookWork",
        [
          "Those are pretty cool projects",
          "What do you think?",
          "Wanna work with me?",
        ],
      ],
      [
        "bookPersonal",
        [
          "Can't wait to code when I get home",
          "Have you read your SICP today?",
          "Woah, I made those things?",
        ],
      ],
      [
        "idle",
        [
          "I don't drink coffee btw",
          "Did Vercel already fixed the Next.js caching?",
          "I used to play CSGO and sweep the Asia server",
          "Why is 6 afraid of 7? Coz 7 8 9! Get it? 7 ate 9? hehe...",
          "Christ Jesus is King!",
        ],
      ],
    ]);
    this.init = false;
    this.idle = false;
    this.idleTimer = 0;
    this.idleTimerMaxFrame = 800;
    this.resume = false;
    this.bookWork = false;
    this.bookPersonal = false;
  }

  trackDialog = (x, y) => {
    if (!this.init) {
      this.setDialog(this.randomizedDialog("init"));
      this.init = true;
    } else if (!this.idle && this.currentDialog === null) {
      if (this.idleTimer >= this.idleTimerMaxFrame) {
        this.setDialog(this.randomizedDialog("idle"));
        this.idle = true;
      } else {
        this.idleTimer++;
      }
    } else {
      this.resetDialogs();
    }

    this.animateDialog(x, y);
  };

  triggerResume = () => {
    if (!this.resume) {
      this.setDialog(this.randomizedDialog("resume"));
      this.resume = true;
    }

    if (this.currentDialog === null) {
      this.resetDialogs();
    }
  };

  triggerBook = (bookType) => {
    if (!this[bookType]) {
      this.setDialog(this.randomizedDialog(bookType));
      this[bookType] = true;
    }

    if (this.currentDialog === null) {
      this.resetDialogs();
    }
  };

  resetDialogs = () => {
    this.bookWork = false;
    this.bookPersonal = false;
    this.idleTimer = 0;
    this.idle = false;
  };

  randomizedDialog = (key) => {
    const dialogArray = this.dialogLines.get(key);
    const line = dialogArray[randomizeNumber(0, dialogArray.length - 1)];

    return line;
  };
}
