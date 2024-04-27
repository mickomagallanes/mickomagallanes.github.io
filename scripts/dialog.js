class Dialog {
  constructor() {
    this.currentDialog = null;

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

  setDialog = (text) => {
    this.currentDialog = text;
    this.dialogCounter = 0;
  };

  getBreakLines = () => {
    let textLines = [];

    const words = this.currentDialog.split(" ");
    let currentLine = "";
    let textWidth = 0;

    for (let word of words) {
      const wordWidth = CONTEXT.measureText(word).width;

      if (textWidth + wordWidth < this.dialogBoxWidth - this.dialogPadding) {
        currentLine += word + " ";
        textWidth += wordWidth;
      } else {
        textLines.push(currentLine.trim());
        currentLine = word + " ";
        textWidth = wordWidth;
      }
    }
    textLines.push(currentLine.trim());

    return textLines;
  };

  animateDialog = (x, y) => {
    if (this.currentDialog !== null) {
      // Clear previous dialog box

      this.displayDialog(x, y);

      // Increment dialog counter
      this.dialogCounter++;

      // Check if dialog duration is reached
      if (this.dialogCounter >= this.dialogDuration) {
        this.clearDialog();
      }
    }
  };

  displayDialog = (x, y) => {
    let textWidth = 0;
    let textLines = this.getBreakLines();

    // Measure the longest line
    for (let i = 0; i < textLines.length; i++) {
      const line = textLines[i];
      const lineWidth = CONTEXT.measureText(line).width;
      textWidth = Math.max(textWidth, lineWidth);
    }

    let currentBoxWidth = textWidth + this.dialogPadding; // Add some padding

    const dialogBoxHeight =
      textLines.length * this.lineHeight + this.dialogPadding; // adjusted based on line break

    const dialogX = x + SPRITE_WIDTH / 2 - currentBoxWidth / 2;
    const dialogY = y + this.dialogBoxOffsetY * textLines.length;

    // Draw dialogue box
    CONTEXT.fillStyle = `rgba(0, 0, 0, ${this.dialogOpacity})`;
    CONTEXT.fillRect(dialogX, dialogY, currentBoxWidth, dialogBoxHeight);

    // Draw dialogue text
    CONTEXT.fillStyle = "white";
    CONTEXT.font = `${this.fontSize}px Arial`;
    CONTEXT.textAlign = "left"; // Changed alignment to left
    let textY = dialogY + this.lineHeight;
    textLines.forEach((line) => {
      CONTEXT.fillText(line, dialogX + 10, textY); // Adjusted x-coordinate
      textY += this.lineHeight;
    });
  };

  // Method to clear dialog from canvas
  clearDialog = () => {
    this.currentDialog = null;
    this.dialogCounter = 0;
  };
}
