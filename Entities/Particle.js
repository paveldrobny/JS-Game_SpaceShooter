import GameManager from "../gameManager.js";
import { Game } from "../global.js";
const gameManager = new GameManager();

export default class Particle {
  constructor() {
    this.x = Game.isPlay
      ? gameManager.width
      : Math.random() * gameManager.width;
    this.y = Game.isPlay ? Math.random() * gameManager.height : 0;
    this.xVel = 5;
    this.yVel = 2;
    this.w = 4 * gameManager.getScale();
    this.h = 4 * gameManager.getScale();
    this.color = "rgba(255,255,255,0.5";
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
    Game.isPlay ? (this.x -= this.xVel) : (this.y += this.yVel);
  }
}
