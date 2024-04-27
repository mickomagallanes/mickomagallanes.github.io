class PlayerDialog extends Dialog {
  constructor() {
    super();
    this.dialogLines = new Map([["init", "Where am I?"]]);
    this.init = false;
  }

  trackDialog = (x, y) => {
    if (!this.init) {
      this.setDialog(this.dialogLines.get("init"));
      this.init = true;
    }

    this.animateDialog(x, y);
  };
}
