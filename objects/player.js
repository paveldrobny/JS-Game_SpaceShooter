import Object from "./base.js";
import GameManager from "../gameManager.js";

const gameManager = new GameManager();

export default class Player extends Object {
  constructor(x, y, color) {
    super();
    this.x = x;
    this.y = y;
    this.w = 55;
    this.h = 55;
    this.r = 50;
    this.speed = 10;
    this.health = 100;
    this.color = "rgb(153,153,255)";
    this.wingColor = "rgb(102,102,255)";
    this.wingWidth = 120;
    this.wingHeight = 15;
    this.tag = "Player";
  }

  draw(context) {
    super.draw(context);
  }

  damage() {
    this.health -= 20;
  }

  reset() {
  
  }
}
