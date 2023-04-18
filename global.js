export const Game = {
  _isPlay: false,
  _isGameOver: false,
  _score: 0,
  _myBestScore:
    localStorage.getItem("score") !== null
      ? parseInt(localStorage.getItem("score"))
      : 0,

  get isPlay() {
    return this._isPlay;
  },

  set isPlay(value) {
    this._isPlay = value;
  },

  get isGameOver() {
    return this._isGameOver;
  },

  set isGameOver(value) {
    this._isGameOver = value;
  },

  get score() {
    return this._score;
  },

  set score(value) {
    this._score = value;
  },

  get myBestScore() {
    return this._myBestScore;
  },

  set myBestScore(value) {
    this._myBestScore = value;
  },
};

export const UI = {
  _langIndex:
    localStorage.getItem("lang") !== null
      ? parseInt(localStorage.getItem("lang"))
      : 0, // default set English language
  _panelUIIndex: 0, // default show Main Menu
  _mainMenuIndex: 0,
  _highMenuIndex: 0,
  _languageMenuIndex: 2,
  _controlsMenuIndex: 0,
  _gameOverMenuIndex: 0,
  _gamepadValidIndex: 0,

  get langIndex() {
    return this._langIndex;
  },

  set langIndex(value) {
    this._langIndex = value;
  },

  get panelUIIndex() {
    return this._panelUIIndex;
  },

  set panelUIIndex(value) {
    this._panelUIIndex = value;
  },

  get mainMenuIndex() {
    return this._mainMenuIndex;
  },

  set mainMenuIndex(value) {
    this._mainMenuIndex = value;
  },

  get highMenuIndex() {
    return this._highMenuIndex;
  },

  set highMenuIndex(value) {
    this._highMenuIndex = value;
  },

  get languageMenuIndex() {
    return this._languageMenuIndex;
  },

  set languageMenuIndex(value) {
    this._languageMenuIndex = value;
  },

  get controlsMenuIndex() {
    return this._controlsMenuIndex;
  },

  set controlsMenuIndex(value) {
    this._controlsMenuIndex = value;
  },

  get gameOverMenuIndex() {
    return this._gameOverMenuIndex;
  },

  set gameOverMenuIndex(value) {
    this._gameOverMenuIndex = value;
  },

  get gamepadValidIndex() {
    return this._gamepadValidIndex;
  },

  set gamepadValidIndex(value) {
    this._gamepadValidIndex = value;
  },
};
