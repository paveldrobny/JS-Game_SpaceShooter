export default class Buttons {
  constructor() {
    this.myGamepad = navigator.getGamepads()[0];
  }
  
  keyboard() {
    return {
      W: 87,
      A: 65,
      S: 83,
      D: 68,
      ArrowUp: 38,
      ArrowLeft: 37,
      ArrowDown: 40,
      ArrowRight: 39,
      Esc: 27,
      Enter: 13,
      Spacebar: 32,
    };
  }

  gamepad() {
    return {
      Up: this.myGamepad.axes[1] === -1,
      Left: this.myGamepad.axes[0] === -1,
      Right: this.myGamepad.axes[0] === 1,
      Down: this.myGamepad.axes[1] === 1,
      B: this.myGamepad.buttons[1],
      A: this.myGamepad.buttons[2],
      X: this.myGamepad.buttons[3],
    };
  }
}
