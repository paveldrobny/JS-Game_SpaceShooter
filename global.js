export const DebugMode = {
  isEnabled: false,
  collision: {
    player: false,
    enemy: false,
  },
};

export const Game = {
  isPlay: false,
  isGameOver: false,
  playerHealth:
    localStorage.getItem("health") !== null
      ? parseInt(localStorage.getItem("health"))
      : 3,
  coins:
    localStorage.getItem("coins") !== null
      ? parseInt(localStorage.getItem("coins"))
      : 0,
  score: 0,
  myBestScore:
    localStorage.getItem("score") !== null
      ? parseInt(localStorage.getItem("score"))
      : 0,
};

export const UI = {
  langIndex:
    localStorage.getItem("lang") !== null
      ? parseInt(localStorage.getItem("lang"))
      : 0, // default set English language

  panelUIIndex: 0, // default show Main Menu
  mainMenuIndex: 0,
  highMenuIndex: 0,
  abilitiesIndex: 1,
  achievementsIndex: 0,
  languageMenuIndex: 2,
  controlsMenuIndex: 0,
  gameOverMenuIndex: 0,
  gamepadValidIndex: 0,
};
