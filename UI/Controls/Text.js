import GameManager from "../../gameManager.js";

export default class Text {
  constructor(i, text, posY) {
    this.i = i;
    this.text = text;
    this.posY = posY;
  }

  draw(posX = 0, posY = 0, align = "center", fontSize = 45, color = "white") {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const gameManager = new GameManager();

    context.font = `${fontSize}px sans-serif`;
    context.fillStyle = color;
    context.textAlign = align;
    context.fillText(
      this.text,
      gameManager.width / 2 + posX,
      gameManager.height / 2 + posY
    );
  }
}
