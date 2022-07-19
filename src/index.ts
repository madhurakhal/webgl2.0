import GLInstance from "./gl";
import { WebGL2RenderingContextCustom } from "./models/webgl2-rendering-context-custom";

let gl: WebGL2RenderingContextCustom | null;

window.addEventListener('load', () => {
  // Get our extended GL Context Object
  gl = GLInstance('glcanvas');

  if (!gl) {
    console.error(`No webgl 2.0 context loaded`);
  }

  gl?.fSetSize(500,500).fClear();

  // Shaders
  // SHADERS STEPS
  // 1. Get vertext and Fragment Shader Text
  // 2. Compile text and validate
  // 3. Link the shaders together as a program
  // 4. Get Location of Uniforms and Attributes

});