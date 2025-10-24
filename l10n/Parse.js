import { UI } from "../global.js";
import English from "./English.js";
import Russian from "./Russian.js";

const lang = [English, Russian];

const currentLang = () => lang[UI.langIndex];

export const getMenuText = () => [
  currentLang().play,
  currentLang().bestScore,
  currentLang().abilities,
  currentLang().achievements,
  currentLang().language,
  currentLang().controls,
];

export const getAvailableLanguagesText = () => [
  currentLang().english,
  currentLang().russian,
  currentLang().backToMenu,
];

export const getCoins = () => currentLang().getCoins;

export const abilitiesText = () => [
  currentLang().upHealth,
  currentLang().backToMenu,
];

export const keyboardInputText = () => [
  currentLang().keyboardTitle,
  currentLang().keyboardMove,
  currentLang().keyboardShoot,
];

export const achievements = () => [
  currentLang().achievementsUnlock,
  currentLang().firstStep,
  currentLang().firstStepDesc,
  currentLang().trippleKill,
  currentLang().trippleKillDesc,
];

export const backToMenu = () => currentLang().backToMenu;
export const myBestScore = () => currentLang().myBestScore;

export const version = "v1.6";
export const dev = () => currentLang().dev;
export const navigation = () => currentLang().navigation;
export const confirm = () => currentLang().confirm;

export const gameOver = () => currentLang().gameOverTitle;
export const gameOverScore = () => currentLang().gameOverScore;
export const gameOverText = () => [
  currentLang().playAgain,
  currentLang().backToMenu,
];

const l10n = {
  getMenuText,
  getAvailableLanguagesText,
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

export default l10n;
