export default class GameManager {
  constructor() {
    // Setting a different resolution may cause problems with the position of objects
    this.width = 1920;
    this.height = 1080;
    this.aspectRatio = 16 / 9;
  }

  area(player) {
    if (player.y < 75) player.y = 75;
    if (player.y > this.height - 50) player.y = this.height - 50;
  }

  getScale() {
    return (this.width * 1) / window.screen.width;
  }

  resize(canvas, context, canvasWidth, canvasHeight) {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    if (canvasHeight < canvasWidth / this.aspectRatio) {
      canvasWidth = canvasHeight * this.aspectRatio;
    } else canvasHeight = canvasWidth / this.aspectRatio;

    canvas.width = this.width;
    canvas.height = this.height;
    context.mozImageSmoothingEnabled = true;
    context.webkitImageSmoothingEnabled = true;
    context.imageSmoothingEnabled = true;
    context.msImageSmoothingEnabled = true;

    canvas.style.top = "50%";
    canvas.style.left = "50%";
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
  }
}
