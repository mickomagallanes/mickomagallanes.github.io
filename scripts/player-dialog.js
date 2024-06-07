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
    ]);
    this.init = false;
    this.resume = false;
    this.bookWork = false;
    this.bookPersonal = false;
  }

  trackDialog = (x, y) => {
    if (!this.init) {
      this.setDialog(this.randomizedDialog("init"));
      this.init = true;
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
  };

  randomizedDialog = (key) => {
    const dialogArray = this.dialogLines.get(key);
    const line = dialogArray[randomizeNumber(0, dialogArray.length - 1)];

    return line;
  };
}
