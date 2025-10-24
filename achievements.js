import l10n from "./l10n/Parse.js";
import Text from "./UI/Controls/Text.js";
import GameManager from "./GameManager.js";

export const achievementsCondition = {
  Count: {
    reach: 0,
    kill: 0,
  },
};

export class Achievements {
  constructor() {
    this.currentUnlock = 0;
    this.MESSAGE_TIME = 300;
    this.currentMessageTime = this.MESSAGE_TIME;
    this.isShowUI = false;

    // update
    this.data = [
      {
        title: () => l10n.achievements()[1],
        desc: () => l10n.achievements()[2],
        unlock: localStorage.getItem("a_fs") ?? false,
      },
      {
        title: () => l10n.achievements()[3],
        desc: () => l10n.achievements()[4],
        unlock: localStorage.getItem("a_tk") ?? false,
      },
    ];
  }

  UI() {
    if (this.isShowUI) {
      this.currentMessageTime--;

      const gameManager = new GameManager();
      const textHeader = new Text(0, l10n.achievements()[0]);
      textHeader.draw(0, gameManager.height / 2 - 95, "center", 20);
      const textTitle = new Text(0, this.data[this.currentUnlock].title());
      textTitle.draw(0, gameManager.height / 2 - 60, "center", 30);
      const text = new Text(0, this.data[this.currentUnlock].desc());
      text.draw(0, gameManager.height / 2 - 30, "center", 22);

      if (this.currentMessageTime <= 0) {
        this.isShowUI = false;
        if (this.isShowUI == false) {
          this.currentMessageTime = this.MESSAGE_TIME;
        }
      }
    }
  }

  mainLogic(index) {
    this.currentUnlock = index;
    this.currentMessageTime = this.MESSAGE_TIME;
    this.data[index].unlock = true;
    this.isShowUI = true;
  }

  checkReach() {
    if (this.data[0].unlock == false) {
      achievementsCondition.Count.reach++;
      if (achievementsCondition.Count.reach >= 1000) {
        if (localStorage.getItem("a_fs") === null) {
          localStorage.setItem("a_fs", true);
        }
        this.mainLogic(0);
      }
    }
  }

  checkKill() {
    if (this.data[1].unlock == false) {
      if (achievementsCondition.Count.kill >= 3) {
        if (localStorage.getItem("a_tk") === null) {
          localStorage.setItem("a_tk", true);
        }
        this.mainLogic(1);
      }
    }
  }
}
