import Object from "./Base.js";

export default class EnemyAverage extends Object {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 100;
    this.r = 50;
    this.color = "rgb(255,204,153)";
    this.wingColor = "rgb(255,178,102)";
    this.wingWidth = 120;
    this.wingHeight = 15;
    this.active = true;
    this.aligh = "right";
    this.tag = "EnemyAverage";
  }

  draw(context) {
    super.draw(context);
  }

  destroy() {
    super.destroy();
  }
}
