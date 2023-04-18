import { UI } from "../global.js";
import English from "./English.js";
import Russian from "./Russian.js";

const lang = [English, Russian];
const index = UI.langIndex;

export const menuText = [
  lang[index].play,
  lang[index].bestScore,
  // lang[index].abilities,
  lang[index].achievements,
  lang[index].language,
  lang[index].controls,
];

export const availableLanguagesText = [
  lang[index].english,
  lang[index].russian,
  lang[index].backToMenu,
];

export const reloadMessage = lang[index].reloadMessage;

export const keyboardInputText = [
  lang[index].keyboardTitle,
  lang[index].keyboardMove,
  lang[index].keyboardShoot,
];

export const gamepadInputText = [
  lang[index].gamepadTitle,
  lang[index].gamepadMove,
  lang[index].gamepadShoot,
];

export const backToMenu = lang[index].backToMenu;
export const myBestScore = lang[index].myBestScore;

export const dev = lang[index].dev;
export const version = "v0.9.5 (BETA)";
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
  gamepadInputText,
  backToMenu,
  myBestScore,
  dev,
  version,
  navigation,
  confirm,
  gameOver,
  gameOverScore,
  gameOverText,
};

export default localization;
