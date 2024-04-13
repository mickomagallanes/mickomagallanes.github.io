let currentGame;

window.onload = function () {
  const canvas = document.getElementById("game");
  const context = canvas.getContext("2d");

  currentGame = new Game(context);
  requestAnimationFrame(currentGame.init);
};
