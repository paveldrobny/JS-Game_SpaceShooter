import { Game, UI } from "../../global.js";
import ButtonMain from "../Controls/ButtonMain.js";
import Text from "../Controls/Text.js";
import localization from "../../Localization/Parse.js";

export default class GameOverMenu {
  draw() {
    const text = new Text(0, localization.gameOver);
    text.draw(0, -230, "center", 55);

    const textScore = new Text(0, `${localization.gameOverScore + Game.score}`);
    textScore.draw(0, -180, "center", 35);

    for (let i = 0; i < localization.gameOverText.length; i++) {
      const buttonMain = new ButtonMain(
        i,
        localization.gameOverText[i],
        UI.gameOverMenuIndex,
        0.8
      );
      buttonMain.draw();
    }
  }
  select() {
    switch (UI.gameOverMenuIndex) {
      case 0:
        Game.score = 0;
        Game.isGameOver = false;
        Game.isPlay = true;
        console.log("Ssad");
        break;
      case 1:
        UI.panelUIIndex = 0;
        Game.score = 0;
        Game.isGameOver = false;
        Game.isPlay = false;
        break;
    }
  }
}
