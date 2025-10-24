export default class GameManager {
  constructor() {
    // Setting a different resolution may cause problems with the position of objects
    this.width = 1280;
    this.height = 720;
    this.aspectRatio = 16 / 9;
  }

  area(player) {
    if (player.y < 75) player.y = 75;
    if (player.y >= this.height - 135) player.y = this.height - 135;
  }

  getScale() {
    return 1;
  }

  resize(canvas, context) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const aspectRatio = this.aspectRatio;

    // No longer looks blurry on screens larger than ~720p
    const dpr = window.devicePixelRatio || 1;

    let displayWidth = windowWidth;
    let displayHeight = windowWidth / aspectRatio;

    if (displayHeight > windowHeight) {
      displayHeight = windowHeight;
      displayWidth = displayHeight * aspectRatio;
    }

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;
    canvas.style.position = "absolute";
    canvas.style.top = "50%";
    canvas.style.left = "50%";
    canvas.style.transform = "translate(-50%, -50%)";

    context.imageSmoothingEnabled = true;

    const scaleX = (displayWidth * dpr) / this.width;
    const scaleY = (displayHeight * dpr) / this.height;
    context.setTransform(scaleX, 0, 0, scaleY, 0, 0);
  }
}