import GameManager from "../gameManager.js";
const gameManager = new GameManager();

export default class ObjectBase {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.w = 0;
    this.h = 0;
    this.r = 100;
    this.speed = 15;
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
    context.fillStyle = this.color;
    context.arc(
      this.x / gameManager.getScale() + (this.h / 2) * gameManager.getScale(),
      this.y / gameManager.getScale() + (this.h / 2) * gameManager.getScale(),
      this.r * gameManager.getScale(),
      0,
      2 * Math.PI,
      false
    );
    context.fill();

    // Debug collision box
    // context.fillStyle = "rgba(255,0,0,1)";
    // context.fillRect(
    //   this.x / gameManager.getScale(),
    //   this.y / gameManager.getScale(),
    //   this.w * gameManager.getScale(),
    //   this.h * gameManager.getScale()
    // );

    // up wing
    context.fillStyle = this.wingColor;
    context.fillRect(
      this.aligh !== "left"
        ? this.x / gameManager.getScale() - 34 * gameManager.getScale()
        : this.x / gameManager.getScale() + 12 * gameManager.getScale(),
      this.y / gameManager.getScale() -
        (this.h / 2) * gameManager.getScale() +
        (this.h / 2) * gameManager.getScale(),
      this.wingWidth * gameManager.getScale(),
      this.wingHeight * gameManager.getScale()
    );

    // down wing
    context.fillStyle = this.wingColor;
    context.fillRect(
      this.aligh !== "left"
        ? this.x / gameManager.getScale() - 34 * gameManager.getScale()
        : this.x / gameManager.getScale() + 12 * gameManager.getScale(),
      this.y / gameManager.getScale() +
        (this.h * gameManager.getScale()) / 2 +
        34 * gameManager.getScale() +
        1,
      this.wingWidth * gameManager.getScale(),
      this.wingHeight * gameManager.getScale()
    );
  }

  move() {
    this.x -= 15 * gameManager.getScale();
  }

  destroy() {
    this.active = false;
  }
}
