import {
  BoxBufferGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "https://cdn.skypack.dev/three@0.132.2";

import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";

// Get a reference to the container element that will hold our scene
const container = document.querySelector("#scene-container");

// create a Scene
const scene = new Scene();

// Set the background color
scene.background = new Color("skyblue");

// Create a camera
const fov = 35; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new PerspectiveCamera(fov, aspect, near, far);
// move the camera back so we can view the scene
camera.position.set(0, 0, 10);

// create a geometry
const geometry = new BoxBufferGeometry(2, 2, 2);

// create a default (white) Basic material
const material = new MeshBasicMaterial();

// create a Mesh containing the geometry and material
const cube = new Mesh(geometry, material);

// add the mesh to the scene
scene.add(cube);

// create the renderer
const renderer = new WebGLRenderer();

// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, container.clientHeight);

// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

// create the orbit controls and enable damping
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// define a variable to store the time elapsed since the animation started
let timeElapsed = 0;

// define a function to update the cube's position based on the time elapsed
function updateCubePosition() {
  const speed = 1; // adjust this to change the speed of the animation
  const angle = timeElapsed * speed;
  cube.position.set(Math.sin(angle), 0, Math.cos(angle));
  timeElapsed += 0.01;
}

// define a function to render the scene
function render() {
  // request the next frame of the animation
  requestAnimationFrame(render);

  // update the position of the cube
  updateCubePosition();

  // update the orbit controls
  controls.update();

  // render the scene
  renderer.render(scene, camera);
}

// start the animation
render();
