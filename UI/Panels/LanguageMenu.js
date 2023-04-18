import localization from "../../Localization/Parse.js";
import GameManager from "../../gameManager.js";
import { UI } from "../../global.js";
import ButtonMain from "../Controls/ButtonMain.js";
import DebugMessage from "../DebugMessage.js";

const gameManager = new GameManager();

export default class LanguageMenu {
  draw() {
    for (let i = 0; i < localization.availableLanguagesText.length; i++) {
      const buttonMain = new ButtonMain(
        i,
        localization.availableLanguagesText[i],
        UI.languageMenuIndex,
        i == localization.availableLanguagesText.length - 1 ? 0.5 : 2.4
      );
      buttonMain.draw();
    }

    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    new DebugMessage({
      x: gameManager.width / 2,
      y: gameManager.height / 2,
      text: localization.reloadMessage,
      align: "center",
      size: 28,
    }).draw(context);
  }

  applyLang(id){
    UI.langIndex = id;
    localStorage.setItem("lang", UI.langIndex);
    window.location.reload();
  }

  select() {
    switch (UI.languageMenuIndex) {
      case 0:
        applyLang(0);
        break;
      case 1:
        applyLang(1);
        break;
      case 2:
        UI.panelUIIndex = 0;
        break;
    }
  }
}
