window.onload = () => {
  let currentGame = new Game();
  currentGame.init();

  // Get the current URL
  const url = new URL(window.location.href);

  // Retrieve the 'download' parameter from the query string
  const downloadParam = url.searchParams.get("download");

  // Check if the 'download' parameter exists and log it
  if (downloadParam === "contact.vcf") {
    const link = document.createElement("a");
    link.href = "assets/files/contact.vcf";
    link.download = "contact.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
