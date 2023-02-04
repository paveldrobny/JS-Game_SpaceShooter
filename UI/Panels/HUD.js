import GameManager from "../../gameManager.js";
import { Game } from "../../global.js";
const gameManager = new GameManager();

export default class HUD {
  constructor() {
    this.safeZone = 10 * gameManager.getScale();
    this.healthBarWidth = gameManager.width - this.safeZone * 2;
  }

  draw(context, player) {
    context.fillStyle = "rgba(0,0,0,.15)";
    context.fillRect(this.safeZone, this.safeZone, this.healthBarWidth, 10);
    context.fillStyle =
      player.health <= 33.33 ? "rgb(215,50,50)" : "rgb(5,90,10)";
    context.fillRect(
      this.safeZone,
      this.safeZone,
      (player.health * this.healthBarWidth) / 100,
      10
    );

    // draw score
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
