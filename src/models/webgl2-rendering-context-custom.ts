export interface WebGL2RenderingContextCustom extends WebGL2RenderingContext {
  fClear: () => WebGL2RenderingContextCustom;
  fSetSize: (width: number, height: number) => WebGL2RenderingContextCustom;
}
