class Dialog {
  constructor() {
    this.currentDialog = null;
    this.x;
    this.y;
    this.dialogBoxWidth = 200;
    this.dialogBoxHeight = 60;
    this.dialogBoxOffsetX = -78; // Offset from character's position
    this.dialogBoxOffsetY = -20; // Offset from character's position
    this.dialogDuration = 500; // Duration in frames
    this.dialogCounter = 0; // Counter for tracking duration
    this.fontSize = 14;
    this.dialogOpacity = 0.6;
    this.dialogPadding = 20;
    this.lineHeight = Math.floor(this.fontSize * 1.5);
  }

  // each player and npc has own currentDialog
  setDialog(text) {
    this.currentDialog = text;
    this.dialogCounter = 0;
  }

  /**
   * rendered every frame
   * @param {*} x of player/npc
   * @param {*} y of player/npc
   */
  animateDialog(x, y) {
    if (this.currentDialog !== null) {
      this.displayDialog(x, y);
      this.dialogCounter++;
      if (this.dialogCounter >= this.dialogDuration) {
        this.clearDialog();
      }
    }
  }

  /**
   * splits the current dialog and splice it based on dialog length
   * @returns [] array of spliced line of words based on dialog length
   */
  getBrokenLines() {
    const textLines = [];
    const words = this.currentDialog.split(" ");
    let currentLine = "";
    let textWidth = 0;

    for (const word of words) {
      const wordWidth = CONTEXT.measureText(word).width;

      // add to current array item if word still fits
      if (textWidth + wordWidth < this.dialogBoxWidth - this.dialogPadding) {
        currentLine += word + " ";
        textWidth += wordWidth;
      } else {
        // skip to next array item
        textLines.push(currentLine.trim());
        currentLine = word + " ";
        textWidth = wordWidth;
      }
    }
    textLines.push(currentLine.trim());

    return textLines;
  }

  /**
   *
   * @param {*} x of player/npc
   * @param {*} y of player/npc
   */
  displayDialog(x, y) {
    const textLines = this.getBrokenLines();
    const dialogBoxHeight =
      textLines.length * this.lineHeight + this.dialogPadding;

    const dialogBoxWidth = this.getDialogBoxWidth(textLines);

    const dialogX = x + PLAYER_WIDTH / 2 - dialogBoxWidth / 2;
    const dialogY = y + this.dialogBoxOffsetY * textLines.length;

    CONTEXT.fillStyle = `rgba(0, 0, 0, ${this.dialogOpacity})`;
    CONTEXT.fillRect(dialogX, dialogY, dialogBoxWidth, dialogBoxHeight);

    CONTEXT.fillStyle = "white";
    CONTEXT.font = `${this.fontSize}px Arial`;
    CONTEXT.textAlign = "left";

    let textY = dialogY + this.lineHeight;
    textLines.forEach((line) => {
      CONTEXT.fillText(line, dialogX + 10, textY);
      textY += this.lineHeight;
    });
  }

  getDialogBoxWidth(textLines) {
    let textWidth = 0;

    // getBrokenLines() already calculated the max width for dialog box
    for (const line of textLines) {
      const lineWidth = CONTEXT.measureText(line).width;
      textWidth = Math.max(textWidth, lineWidth);
    }

    return textWidth + this.dialogPadding;
  }

  // Method to clear dialog from canvas
  clearDialog = () => {
    this.currentDialog = null;
    this.dialogCounter = 0;
  };
}
