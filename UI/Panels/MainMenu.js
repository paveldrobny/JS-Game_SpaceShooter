import l10n from "../../l10n/Parse.js";
import { Game, UI } from "../../Global.js";
import ButtonMain from "../Controls/ButtonMain.js";
export default class MainMenu {
  draw() {
    const items = l10n.getMenuText();
    for (let i = 0; i < items.length; i++) {
      const buttonMain = new ButtonMain(
        i,
        items[i],
        UI.mainMenuIndex,
        2.8
      );
      buttonMain.draw();
    }
  }

  select(player) {
    switch (UI.mainMenuIndex) {
      case 0:
        Game.isPlay = true;
        Game.isGameOver = false;

        if (localStorage.getItem("health") !== null) {
          player.health = parseInt(localStorage.getItem("health"));
        } else {
          player.health = 3;
        }
        break;
      case 1:
        UI.panelUIIndex = 1;
        break;
      case 2:
        UI.panelUIIndex = 2;
        break;
      case 3:
        UI.panelUIIndex = 3;
        break;
      case 4:
        UI.panelUIIndex = 4;
        break;
      case 5:
        UI.panelUIIndex = 5;
        break;
    }
  }
}
