window.onload = () => {
  showInstructions();

  let currentGame = new Game();
  currentGame.init();
};

function showInstructions() {
  const overlay = document.getElementById("overlay");
  const instructions = document.createElement("p");

  instructions.textContent = "Use WASD or arrow keys to move ";

  // Display different instructions for desktop and mobile
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    instructions.textContent = "Touch and drag to move";
  }

  overlay.appendChild(instructions);
}
