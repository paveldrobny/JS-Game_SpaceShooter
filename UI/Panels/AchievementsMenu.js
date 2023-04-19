import localization from "../../Localization/Parse.js";
import { Achievements } from "../../achievements.js";
import { Game, UI } from "../../global.js";
import ButtonMain from "../Controls/ButtonMain.js";
import Text from "../Controls/Text.js";

export default class AchievementsMenu {
  draw() {
    const achievements = new Achievements();
    const ac = localization.achievements;
    const achievementsData = [ac[1], ac[3]];

    for (let i = 0; i < achievementsData.length; i++) {
      const text = new Text(
        i,
        `${i + 1}. ${achievementsData[i]} ${
          achievements.data[i].unlock === "true"
            ? "(+)"
            : "(-)"
        }`
      );
      text.draw(0, i * 70 - 70 * 3, "center", 35);
    }

    const buttonMain = new ButtonMain(
      0,
      localization.backToMenu,
      UI.achievementsIndex,
      -1
    );
    buttonMain.draw();
  }

  select() {
    switch (UI.achievementsIndex) {
      case 0:
        UI.panelUIIndex = 0;
        break;
    }
  }
}
