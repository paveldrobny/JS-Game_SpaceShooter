import localization from "../../Localization/Parse.js";
import { Game, UI } from "../../global.js";
import ButtonMain from "../Controls/ButtonMain.js";
export default class MainMenu {
  draw() {
    for (let i = 0; i < localization.menuText.length; i++) {
      const buttonMain = new ButtonMain(
        i,
        localization.menuText[i],
        UI.mainMenuIndex,
        2.8
      );
      buttonMain.draw();
    }
  }

  select() {
    switch (UI.mainMenuIndex) {
      case 0:
        Game.isPlay = true;
        Game.isGameOver = false;
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
