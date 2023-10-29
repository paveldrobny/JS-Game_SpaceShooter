import { UI } from "../global.js";
import English from "./English.js";
import Russian from "./Russian.js";

const lang = [English, Russian];
const index = UI.langIndex;

export const menuText = [
  lang[index].play,
  lang[index].bestScore,
  lang[index].abilities,
  lang[index].achievements,
  lang[index].language,
  lang[index].controls,
];

export const availableLanguagesText = [
  lang[index].english,
  lang[index].russian,
  lang[index].backToMenu,
];

export const getCoins = lang[index].getCoins;

export const abilitiesText = [lang[index].upHealth, lang[index].backToMenu];

export const reloadMessage = lang[index].reloadMessage;

export const keyboardInputText = [
  lang[index].keyboardTitle,
  lang[index].keyboardMove,
  lang[index].keyboardShoot,
];

export const achievements = [
  lang[index].achievementsUnlock,
  lang[index].firstStep,
  lang[index].firstStepDesc,
  lang[index].trippleKill,
  lang[index].trippleKillDesc,
];

export const backToMenu = lang[index].backToMenu;
export const myBestScore = lang[index].myBestScore;

export const version = "v1.5";
export const dev = lang[index].dev;
export const navigation = lang[index].navigation;
export const confirm = lang[index].confirm;

export const gameOver = lang[index].gameOverTitle;
export const gameOverScore = lang[index].gameOverScore;
export const gameOverText = [lang[index].playAgain, lang[index].backToMenu];

const localization = {
  menuText,
  availableLanguagesText,
  reloadMessage,
  keyboardInputText,
  backToMenu,
  myBestScore,
  getCoins,
  abilitiesText,
  dev,
  version,
  navigation,
  confirm,
  gameOver,
  gameOverScore,
  gameOverText,
  achievements,
};

export default localization;
