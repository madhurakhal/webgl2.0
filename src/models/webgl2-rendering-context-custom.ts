export interface WebGL2RenderingContextCustom extends WebGL2RenderingContext {
  fClear: () => WebGL2RenderingContextCustom;
  fSetSize: (width: number, height: number) => WebGL2RenderingContextCustom;
  fCreateArrayBuffer: (float: Float32Array, isStatic: boolean) => WebGLBuffer | null;
}
