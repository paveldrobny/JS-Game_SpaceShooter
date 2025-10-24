import l10n from "../../l10n/Parse.js";
import { UI } from "../../Global.js";
import ButtonMain from "../Controls/ButtonMain.js";
import Text from "../Controls/Text.js";

export default class ControlsMenu {
  draw() {
    const items = l10n.keyboardInputText();
    for (let i = 0; i < items.length; i++) {
      const text = new Text(i, items[i]);
      text.draw(0, i * 70 - 70 * 2.5, "center", i === 0 ? 50 : 30);
    }

    const buttonMain = new ButtonMain(
      0,
      l10n.backToMenu(),
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
