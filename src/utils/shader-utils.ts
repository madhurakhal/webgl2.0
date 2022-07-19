import { WebGL2RenderingContextCustom } from "../models/webgl2-rendering-context-custom";

export class ShaderUtils {
  static domShaderSrc(elementId: string): string | null {
    const elem: HTMLScriptElement = document.getElementById(
      elementId
    ) as HTMLScriptElement;
    if (!elem || elem.text === "") {
      console.log(`${elementId} shader not found or no text`);
      return null;
    }
    return elem.text;
  }

  static createShader(
    gl: WebGL2RenderingContextCustom,
    src: string,
    type: number
  ) {
    const shader = gl.createShader(type) as WebGLShader;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    // Get error data if shader failed compiling
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(
        `Error compining shader: ${src}, ${gl.getShaderInfoLog(shader)}`
      );
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  static createProgram(
    gl: WebGL2RenderingContextCustom,
    vShader: WebGLShader,
    fShader: WebGLShader,
    doValidate: boolean
  ) {
    const prog = gl.createProgram() as WebGLProgram;
    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);

    // Check if successful
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(
        `Error creating shader program ${gl.getProgramInfoLog(prog)}`
      );
      gl.deleteProgram(prog);
      return null;
    }

    // Only do this for additional debugging
    if (doValidate) {
      gl.validateProgram(prog);
      if (!gl.getProgramParameter(prog, gl.VALIDATE_STATUS)) {
        console.error(`Error validating program ${gl.getProgramInfoLog(prog)}`);
        gl.deleteProgram(prog);
        return null;
      }
    }

    // Can delete the shaders since the program has been made
    gl.detachShader(prog, vShader);
    gl.detachShader(prog, fShader);
    gl.deleteShader(fShader);
    gl.deleteShader(vShader);
    return prog;
  }
}
