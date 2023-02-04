import Object from "./Base.js";

export default class Player extends Object {
  constructor(x, y) {
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
