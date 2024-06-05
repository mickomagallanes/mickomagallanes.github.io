class Book {
  constructor(x, y, pages, image, title) {
    this.x = x;
    this.y = y;
    this.isImageLoaded = false;
    this.image = loadImage(image, () => {
      this.isImageLoaded = true;
    });

    this.hitbox = new Hitbox(BOOK_WIDTH, BOOK_WIDTH);
    this.bookModal = new BookModal(pages, title);
    this.shine = new Shine(BOOK_WIDTH, BOOK_WIDTH);
  }

  drawBook = () => {
    this.shine.drawShine(this.x, this.y);

    CONTEXT.drawImage(this.image, this.x, this.y, BOOK_WIDTH, BOOK_WIDTH);
    this.hitbox.setCoord(this.x, this.y);
  };

  triggerModal = () => {
    this.bookModal.showModal();
  };
}
