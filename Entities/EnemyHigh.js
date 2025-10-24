import Object from "./Base.js";
import GameManager from "../gameManager.js";

const gameManager = new GameManager();

export default class EnemyHigh extends Object {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 100;
    this.r = 50;
    this.health = 3;
    this.color = "rgb(255,153,153)";
    this.wingColor = "rgb(255,102,102)";
    this.wingWidth = 120;
    this.wingHeight = 15;
    this.aligh = "right";
    this.tag = "EnemyHigh";
  }

  draw(context) {
    super.draw(context);
  }

  damage() {
    super.damage();
  }

  destroy() {
    super.destroy();
  }
}
