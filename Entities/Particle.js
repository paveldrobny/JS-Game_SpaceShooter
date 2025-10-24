import GameManager from "../GameManager.js";
import { Game } from "../Global.js";
const gameManager = new GameManager();

export default class Particle {
  constructor() {
    this.x =
      Game.isPlay && !Game.isGameOver
        ? gameManager.width
        : Math.random() * gameManager.width;
    this.y =
      Game.isPlay && !Game.isGameOver ? Math.random() * gameManager.height : 0;
    this.xVel = 5;
    this.yVel = !Game.isGameOver ? 2 : 20;
    this.w = !Game.isGameOver
      ? 4 * gameManager.getScale()
      : 6 * gameManager.getScale();
    this.h = !Game.isGameOver
      ? 4 * gameManager.getScale()
      : 5 * gameManager.getScale();
    this.color = !Game.isGameOver ? "rgba(255,255,255,0.5" : "red";
    this.active = true;
  }

  inBounds() {
    return (
      this.x >= 0 &&
      this.x <= gameManager.width &&
      this.y >= 0 &&
      this.y <= gameManager.height
    );
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.w, this.h);
    this.active = this.active && this.inBounds();
  }

  update() {
    Game.isPlay && !Game.isGameOver
      ? (this.x -= this.xVel)
      : (this.y += this.yVel);
  }
}