import GameManager from "../GameManager.js";

export default class Bullet {
  constructor(bullet) {
    this.active = true;
    this.color = "rgba(255,0,0,0.8)";
    this.xVel = -bullet.velX;
    this.w = 15;
    this.h = 5;
    this.x = bullet.x;
    this.y = bullet.y;
  }

  inBounds() {
    const gameManager = new GameManager();
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
  }

  update() {
    this.x -= this.xVel;
    this.active = this.inBounds() && this.active;
  }

  destroy() {
    this.active = false;
  }
}
