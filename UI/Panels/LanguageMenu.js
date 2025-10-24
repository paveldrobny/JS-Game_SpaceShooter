import l10n from "../../l10n/Parse.js";
import GameManager from "../../gameManager.js";
import { UI } from "../../global.js";
import ButtonMain from "../Controls/ButtonMain.js";
const gameManager = new GameManager();

export default class LanguageMenu {
  draw() {
    const items = l10n.getAvailableLanguagesText();
    for (let i = 0; i < items.length; i++) {
      const buttonMain = new ButtonMain(
        i,
        items[i],
        UI.languageMenuIndex,
        i == items.length - 1 ? 0.5 : 2.4
      );
      buttonMain.draw();
    }
  }

  applyLang(id){
    UI.langIndex = id;
    localStorage.setItem("lang", UI.langIndex);
  }

  select() {
    switch (UI.languageMenuIndex) {
      case 0:
        this.applyLang(0);
        break;
      case 1:
        this.applyLang(1);
        break;
      case 2:
        UI.panelUIIndex = 0;
        break;
    }
  }
}
