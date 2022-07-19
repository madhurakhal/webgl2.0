import {
    Mesh,
    PerspectiveCamera,
    PlaneBufferGeometry,
    RawShaderMaterial,
    Scene,
    Vector3,
    WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// shaders files
import shader from "./shaders/fragment.fs.glsl";
import vertext from "./shaders/vertex.vs.glsl";

const scene = new Scene();
const camera = new PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const boxGeometry = new PlaneBufferGeometry(1, 1, 32, 32);

const boxMaterial = new RawShaderMaterial({
  vertexShader: vertext,
  fragmentShader: shader,
});

const box = new Mesh(boxGeometry, boxMaterial);

scene.add(box);
camera.position.z = 5;
camera.lookAt(new Vector3(0, 0, 0));
document.body.appendChild(renderer.domElement);

const orbitControl = new OrbitControls(camera, renderer.domElement);

window.addEventListener(
  "resize",
  () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  },
  false
);

function animate() {
  requestAnimationFrame(animate);
  orbitControl.update();
  renderer.render(scene, camera);
}
animate();
