uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;
void main(){
    gl_Position = projectionMatrix * modelMatrix * viewMatrix * vec4(position, 1.0);
    vUv = uv;
}