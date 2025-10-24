import l10n from "../../l10n/Parse.js";
import { Game, UI } from "../../global.js";
import ButtonMain from "../Controls/ButtonMain.js";
import Text from "../Controls/Text.js";

export default class HighScoreMenu {
  draw() {
    const bestScore = l10n.myBestScore();
    const text = new Text(1, bestScore);
    text.draw(0, 70 - 70 * 3, "center", 50);

    const textScore = new Text(1, Game.myBestScore);
    textScore.draw(0, 135 - 150, "center", 55);

    const buttonMain = new ButtonMain(
      0,
      l10n.backToMenu(),
      UI.highMenuIndex,
      -1.8
    );
    buttonMain.draw();
  }

  select() {
    switch (UI.highMenuIndex) {
      case 0:
        UI.panelUIIndex = 0;
        break;
    }
  }
}
