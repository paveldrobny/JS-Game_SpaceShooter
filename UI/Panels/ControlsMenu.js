import localization from "../../Localization/Parse.js";
import { UI } from "../../global.js";
import ButtonMain from "../Controls/ButtonMain.js";
import Text from "../Controls/Text.js";

export default class ControlsMenu {
  draw() {
    for (let i = 0; i < localization.keyboardInputText.length; i++) {
      const text = new Text(i, localization.keyboardInputText[i]);
      text.draw(0, i * 70 - 70 * 2.5, "center", i === 0 ? 50 : 30);
    }

    const buttonMain = new ButtonMain(
      0,
      localization.backToMenu,
      UI.controlsMenuIndex,
      -3
    );
    buttonMain.draw();
  }

  select() {
    switch (UI.controlsMenuIndex) {
      case 0:
        UI.panelUIIndex = 0;
        break;
    }
  }
}
