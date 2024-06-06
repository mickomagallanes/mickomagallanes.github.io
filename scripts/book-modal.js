class BookModal {
  constructor(pages, title) {
    this.pages = pages;
    this.title = title;
    this.currentIndex = 0;
    this.isInRange = false;
    this.isShown = false;
  }

  initEventListeners() {
    addEventListenerWithReplacement(window, "resize", this.handleResize);
    addEventListenerWithReplacement(
      document.getElementById("closeModal"),
      "click",
      this.handleClose
    );
    addEventListenerWithReplacement(
      document.getElementById("closeModal"),
      "touchstart",
      this.handleTouchClose
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
  }

  updatePagesFull() {
    const leftGallery = document.getElementById("leftGallery");
    const rightGallery = document.getElementById("rightGallery");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");

    leftGallery.innerHTML = this.pages[this.currentIndex].left;
    rightGallery.innerHTML = this.pages[this.currentIndex].right;

    prev.style.display = this.currentIndex === 0 ? "none" : "flex";
    next.style.display =
      this.currentIndex >= this.pages.length - 1 ? "none" : "flex";
  }

  updatePagesMobile() {
    const leftGallery = document.getElementById("leftGallery");
    const rightGallery = document.getElementById("rightGallery");
    leftGallery.innerHTML = "";
    rightGallery.innerHTML = "";

    let mergedElements = "";

    this.pages.forEach((page, i) => {
      if (i !== 0) {
        mergedElements += `<span class="bump"></span>`;
      }
      mergedElements += page.left;
      mergedElements += page.right;
    });

    leftGallery.innerHTML = mergedElements;
    document.getElementById("prev").style.display = "none";
    document.getElementById("next").style.display = "none";

    // Ensure links are clickable on mobile
    const links = leftGallery.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("touchstart", (event) => {
        event.stopPropagation(); // Stop the touch event from propagating
        window.open(link.href, "_blank");
      });
    });
  }

  handleClose = () => {
    document.getElementById("bookModal").style.display = "none";
    this.isShown = false;
  };

  handleTouchClose = () => {
    this.handleClose();
  };

  handlePrev = () => {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updatePagesFull();
    }
  };

  handleNext = () => {
    if (this.currentIndex < this.pages.length - 1) {
      this.currentIndex++;
      this.updatePagesFull();
    }
  };

  handleResize = () => {
    if (window.innerWidth < 640) {
      this.updatePagesMobile();
    } else {
      this.updatePagesFull();
    }
  };

  showModal = () => {
    this.isInRange = true;
    this.isShown = true;
    document.getElementById("bookModal").style.display = "flex";
    document.getElementById("modalTitle").innerHTML = this.title;
    this.initEventListeners();

    this.handleResize(); // Initialize pages
  };
}
