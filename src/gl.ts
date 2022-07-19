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

  gl.fCreateArrayBuffer = function(floatArr: Float32Array, isStatic = true) {
    const buf = this.createBuffer();
    this.bindBuffer(this.ARRAY_BUFFER, buf);
    this.bufferData(this.ARRAY_BUFFER, floatArr, isStatic ? this.STATIC_DRAW : this.DYNAMIC_DRAW);
    this.bindBuffer(this.ARRAY_BUFFER, null);
    return buf;
  }


  return gl;
}
export default GLInstance;
