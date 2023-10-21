import GameManager from "../../gameManager.js";

export default class ButtonMain {
  constructor(i, text, UIIndex, posY) {
    this.i = i;
    this.text = text;
    this.UIIndex = UIIndex;
    this.posY = posY;
  }

  draw() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const gameManager = new GameManager();

    const UIButton = {
      space: 50,
      fontWeight: {
        normal: "normal",
        active: "bold",
      },
      color: {
        normal: "white",
        active: "red",
      },
      dot: {
        space: 30,
        radius: 5,
      },
    };

    context.font = `${
      this.UIIndex == this.i
        ? UIButton.fontWeight.active
        : UIButton.fontWeight.normal
    } 30px sans-serif`;
    context.fillStyle =
      this.UIIndex == this.i ? UIButton.color.active : UIButton.color.normal;
    context.textAlign = "center";
    context.fillText(
      this.text,
      gameManager.width / 2,
      gameManager.height / 2 +
        this.i * UIButton.space -
        UIButton.space * this.posY
    );

    if (this.UIIndex == this.i) {
      context.beginPath();
      context.arc(
        gameManager.width / 2 -
          context.measureText(this.text).width / 2 -
          UIButton.dot.space,
        gameManager.height / 2 +
          this.i * UIButton.space -
          UIButton.space * this.posY -
          15,
        UIButton.dot.radius,
        0,
        2 * Math.PI,
        false
      );
      context.arc(
        gameManager.width / 2 +
          context.measureText(this.text).width / 2 +
          UIButton.dot.space,
        gameManager.height / 2 +
          this.i * UIButton.space -
          UIButton.space * this.posY -
          15,
        UIButton.dot.radius,
        0,
        2 * Math.PI,
        false
      );
      context.fillStyle = UIButton.color.active;
      context.fill();
    }
  }
}
