import { Game } from "../global.js";
import Object from "./Base.js";

export default class Player extends Object {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 100;
    this.r = 50;
    this.health = Game.playerHealth;
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
    super.damage();
  }

  reset() {}
}
