import GameManager from "../gameManager.js";
const gameManager = new GameManager();

export default class ObjectBase {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.w = 0;
    this.h = 0;
    this.r = 50;
    this.speed = 0;
    this.color = color;
    this.wingColor = "rgb(102,102,255)";
    this.wingWidth = 120;
    this.wingHeight = 15;
    this.active = true;
    this.aligh = "left";
    this.tag = "";
  }

   draw(context) {
    context.beginPath();
    context.arc(
      this.x / gameManager.getScale(),
      this.y / gameManager.getScale(),
      this.r * gameManager.getScale(),
      0,
      2 * Math.PI,
      false
    );
    context.fillStyle = this.color;
    context.fill();

    // up wing
    context.fillStyle = this.wingColor;
    context.fillRect(
      this.aligh !== "left"
        ? this.x / gameManager.getScale() - 86 * gameManager.getScale()
        : this.x / gameManager.getScale() - 36 * gameManager.getScale(),
      this.y / gameManager.getScale() - this.r * gameManager.getScale() - 1,
      this.wingWidth * gameManager.getScale(),
      this.wingHeight * gameManager.getScale()
    );

    // down wing
    context.fillStyle = this.wingColor;
    context.fillRect(
      this.aligh !== "left"
        ? this.x / gameManager.getScale() - 86 * gameManager.getScale()
        : this.x / gameManager.getScale() - 36 * gameManager.getScale(),
      this.y / gameManager.getScale() +
        (this.r * gameManager.getScale()) / 2 +
        10 * gameManager.getScale() +
        1,
      this.wingWidth * gameManager.getScale(),
      this.wingHeight * gameManager.getScale()
    );
  }
   
  move() {
    this.x -= 8;
  }

  destroy(){
    this.active = false;
  }
}
