import GameManager from "../GameManager.js";
import { DebugMode } from "../Global.js";
const gameManager = new GameManager();

export default class ObjectBase {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.w = 0;
    this.h = 0;
    this.r = 100;
    this.speed = 15;
    this.health = 1;
    this.color = color;
    this.wingColor = "rgb(102,102,255)";
    this.wingWidth = 120;
    this.wingHeight = 15;
    this.active = true;
    this.aligh = "left";
    this.tag = "";
  }

  drawHealth(context, x) {
    const BG_SIZE = 21;
    const SIZE = 15;

    let y =
      this.y / gameManager.getScale() + (this.h / 2) * gameManager.getScale();
    context.fillStyle = "black";
    context.fillRect(x - 3, y - SIZE / 2 - 3, BG_SIZE, BG_SIZE);
    context.fillStyle = this.wingColor;
    context.fillRect(x, y - SIZE / 2, SIZE, SIZE);
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
    if(DebugMode.isEnabled && DebugMode.collision)
    {
      context.fillStyle = "rgba(255,0,0,1)";
      context.fillRect(
          this.x / gameManager.getScale(),
          this.y / gameManager.getScale(),
          this.w * gameManager.getScale(),
          this.h * gameManager.getScale()
      );
    }
    
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

    context.beginPath();
    switch (this.tag) {
      case "EnemyEasy":
        this.drawHealth(context, this.x / gameManager.getScale() + 20 * 2);
        break;
      case "EnemyAverage":
        for (let i = 0; i < this.health; i++) {
          this.drawHealth(
            context,
            this.x / gameManager.getScale() + 30 + i * 28
          );
        }
        break;
      case "EnemyHigh":
        for (let i = 0; i < this.health; i++) {
          this.drawHealth(
            context,
            this.x / gameManager.getScale() + 15 + i * 28
          );
        }
        break;
    }
  }

  move() {
    this.x -= 15 * gameManager.getScale();
  }

  destroy() {
    this.active = false;
  }

  damage() {
    if (!DebugMode.isEnabled || !DebugMode.invincible) {
      this.health -= 1;
    }
  }
}
