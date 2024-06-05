class BookModal {
  constructor(pages, title) {
    this.pages = pages;
    this.title = title;
    this.currentIndex = 0;
    this.isInRange = false;
    this.isShown = false;
  }

  updatePages = () => {
    const leftGallery = document.getElementById("leftGallery");
    const rightGallery = document.getElementById("rightGallery");
    const screenWidth = window.innerWidth;

    if (screenWidth <= 640) {
      const gallery = document.getElementById("gallery");

      // On mobile, show all pages in a single column
      let mergedContent = "";
      this.pages.forEach((page) => {
        mergedContent += `<div class="page">${page.left}</div>`;
        mergedContent += `<div class="page">${page.right}</div>`;
      });
      gallery.innerHTML = mergedContent;
    } else {
      // On desktop, show left and right content separately
      leftGallery.innerHTML = this.pages[this.currentIndex].left;
      rightGallery.innerHTML = this.pages[this.currentIndex].right;
      rightGallery.style.display = "block";
    }
  };

  handleClose = () => {
    document.getElementById("bookModal").style.display = "none";
    this.isShown = false;
  };

  handlePrev = () => {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updatePages();
    }
  };

  handleNext = () => {
    if (this.currentIndex < pages.length - 1) {
      this.currentIndex++;
      this.updatePages();
    }
  };

  handleResize = () => {
    this.updatePages();
  };

  showModal = () => {
    this.isInRange = true;
    this.isShown = true;

    document.getElementById("bookModal").style.display = "flex";
    document.getElementById("modalTitle").innerHTML = this.title;

    addEventListenerWithReplacement(
      document.getElementById("closeModal"),
      "click",
      this.handleClose
    );
    addEventListenerWithReplacement(
      document.getElementById("prev"),
      "click",
      this.handlePrev
    );
    addEventListenerWithReplacement(
      document.getElementById("next"),
      "click",
      this.handleNext
    );
    addEventListenerWithReplacement(window, "resize", this.handleResize);

    // Initialize pages
    this.updatePages();

    // Update pages on window resize
    window.addEventListener("resize", this.updatePages);
  };
}
