class PlayerDialog extends Dialog {
  constructor() {
    super();
    this.dialogLines = new Map([
      [
        "init",
        [
          "Where am I?",
          "This place looks oblivious",
          "*dizzy* Can't remember anythi... wait, who brought me here!?",
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
    ]);
    this.init = false;
    this.resume = false;
  }

  trackDialog = (x, y) => {
    if (!this.init) {
      this.setDialog(this.randomizedDialog("init"));
      this.init = true;
    }

    this.animateDialog(x, y);
  };

  triggerResume = (x, y) => {
    if (!this.resume) {
      this.setDialog(this.randomizedDialog("resume"));
      this.resume = true;
    }

    this.animateDialog(x, y);
  };

  randomizedDialog = (key) => {
    const dialogArray = this.dialogLines.get(key);
    const line = dialogArray[randomizeNumber(0, dialogArray.length - 1)];

    return line;
  };
}
