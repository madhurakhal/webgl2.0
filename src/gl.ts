import { WebGL2RenderingContextCustom } from "./models/webgl2-rendering-context-custom";

function GLInstance(canvasId: string): WebGL2RenderingContextCustom | null {
  const canvas: HTMLCanvasElement = document.getElementById(
    canvasId
  ) as HTMLCanvasElement;
  const gl: WebGL2RenderingContextCustom = canvas.getContext(
    "webgl2"
  ) as WebGL2RenderingContextCustom;

  if (!gl) {
    console.error(`WegGL context is not available.`);
    return null;
  }

  // Setup GL
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  gl.fClear = function () {
    this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT);
    return this;
  };

  gl.fSetSize = function (width: number, height: number) {
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.canvas.width = width;
    this.canvas.height = height;
    this.viewport(0, 0, width, height);
    return this;
  };
  return gl;
}
export default GLInstance;
