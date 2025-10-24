import l10n from "../../l10n/Parse.js";
import GameManager from "../../gameManager.js";
import { Game, UI } from "../../global.js";
import ButtonMain from "../Controls/ButtonMain.js";
import DebugMessage from "../DebugMessage.js";

const gameManager = new GameManager();

export default class AbilitiesMenu {
  draw() {
    const items = l10n.abilitiesText();
    for (let i = 0; i < items.length; i++) {
      const buttonMain = new ButtonMain(
        i,
        items[i],
        UI.abilitiesIndex,
        i == items.length - 1 ? 0.5 : 2.4
      );
      buttonMain.draw();
    }

    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    new DebugMessage({
      x: gameManager.width / 2,
      y: gameManager.height / 2 - 82,
      text: l10n.getCoins(),
      align: "center",
      size: 20,
    }).draw(context);

    new DebugMessage({
      x: gameManager.width / 2,
      y: gameManager.height / 2 - 22,
      text: Game.coins,
      align: "center",
      size: 35,
    }).draw(context);
  }

  select() {
    switch (UI.abilitiesIndex) {
      case 0:
        if (Game.coins >= 1000) {
          Game.coins -= 1000;
          localStorage.setItem("coins", Game.coins);
          Game.playerHealth += 1;
          localStorage.setItem("health", Game.playerHealth);
        }
        break;
      case 1:
        UI.panelUIIndex = 0;
        break;
    }
  }
}
