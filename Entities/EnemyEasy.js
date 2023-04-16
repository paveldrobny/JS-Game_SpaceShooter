import Object from "./Base.js";

export default class EnemyEasy extends Object {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 100;
    this.r = 50;
    this.color = "rgb(204,255,153)";
    this.wingColor = "rgb(178,255,102)";
    this.wingWidth = 120;
    this.wingHeight = 15;
    this.aligh = "right";
    this.tag = "EnemyEasy";
  }

  draw(context) {
    super.draw(context);
  }

  destroy() {
    super.destroy();
  }
}
