let currentGame;

window.onload = () => {
  const canvas = document.getElementById("game");
  const context = canvas.getContext("2d");

  currentGame = new Game(context);
  currentGame.init();
  requestAnimationFrame(currentGame.animate);
};
