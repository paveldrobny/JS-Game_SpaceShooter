import GameManager from "../../GameManager.js";
import { Game } from "../../Global.js";
const gameManager = new GameManager();

export default class HUD {
  constructor() {
    this.safeZone = 10 //* gameManager.getScale();
    this.healthBarWidth = gameManager.width - this.safeZone * 2;
    this.offsetX = 30;
  }

  draw(context, player) {
    const size = 20;          // размер квадрата
    const stepX = 18;         // шаг по X
    const angle = 45 * Math.PI / 180;

    for (let i = 0; i < player.health; i++) {
      const offsetY = (i % 2 === 0) ? 28 : 10; // чередуем по вертикали
      const posX = this.offsetX + i * stepX;

      context.save();
      context.translate(posX, offsetY);
      context.rotate(angle);

      // можно добавить динамический цвет
      context.fillStyle = "white";
      context.fillRect(5, 5, size, size);

      context.restore();
    }

    context.font = "30px sans-serif";
    context.fillStyle = "white";
    context.textAlign = "left";
    context.fillText(
      Game.score,
      this.safeZone,
      gameManager.height - this.safeZone
    );
  }
}
