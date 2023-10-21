export default class DebugMessage {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.text = options.text || "[empty text]";
    this.align = options.align || "center";
    this.color = options.color || "gray";
    this.size = options.size || 18;
  }

  draw(context) {
    context.font = `${this.size}px sans-serif`;
    context.fillStyle = this.color;
    context.textAlign = this.align;
    context.fillText(this.text, this.x, this.y);
  }
}
