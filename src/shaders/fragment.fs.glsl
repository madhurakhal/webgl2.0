precision highp float;

float inCircle(vec2 position, vec2 center, float radius) {
    return 1.0;
}

varying vec2 vUv;

void main() {
    gl_FragColor = vec4(vUv, 0.0, 1.0);
}
