import GLInstance from "./gl";
import { WebGL2RenderingContextCustom } from "./models/webgl2-rendering-context-custom";

import vertextShader from "./shaders/vertex.vs.glsl";
import fragmentShader from "./shaders/fragment.fs.glsl";
import { ShaderUtils } from "./utils/shader-utils";

let gl: WebGL2RenderingContextCustom | null;

window.addEventListener("load", () => {
  // Get our extended GL Context Object
  gl = GLInstance("glcanvas") as WebGL2RenderingContextCustom;

  if (!gl) {
    console.error(`No webgl 2.0 context loaded`);
  }

  gl?.fSetSize(500, 500).fClear();

  // Shaders
  // SHADERS STEPS
  // 1. Get vertext and Fragment Shader Text
  // 2. Compile text and validate
  const vShader = ShaderUtils.createShader(
      gl,
      vertextShader,
      gl?.VERTEX_SHADER
    ) as WebGLShader,
    fShader = ShaderUtils.createShader(
      gl,
      fragmentShader,
      gl?.FRAGMENT_SHADER
    ) as WebGLShader;
  // 3. Link the shaders together as a program

  const shaderProg: WebGLProgram = ShaderUtils.createProgram(
    gl,
    vShader,
    fShader,
    true
  ) as WebGLProgram;

  // 4. Get Location of Uniforms and Attributes
  gl.useProgram(shaderProg);
  const aPositionLoc = gl.getAttribLocation(shaderProg, "a_position"),
    uPositionLoc = gl.getUniformLocation(shaderProg, "uPointSize");
  gl.useProgram(null);

  // Set Up Data Buffers
  const aryVerts = new Float32Array([0, 0, 0, 0.5, 0.5, 0]),
    bufVerts = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, bufVerts);
  gl.bufferData(gl.ARRAY_BUFFER, aryVerts, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Set up For Drawing
  gl.useProgram(shaderProg); // activate the shader
  gl.uniform1f(uPositionLoc, 50.0); // Store data to the shader's uniform variable uPointSize

  // how its down without VAOs
  gl.bindBuffer(gl.ARRAY_BUFFER, bufVerts); // Tell gl which buffer we want to use at the moment
  gl.enableVertexAttribArray(aPositionLoc); // Enable the position attribute in the shader
  gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0); // set which buffer the attribute will pull its data from
  gl.bindBuffer(gl.ARRAY_BUFFER, null); // Done setting up the buffer
  gl.drawArrays(gl.POINTS, 0, 2); // Draw the points
});
