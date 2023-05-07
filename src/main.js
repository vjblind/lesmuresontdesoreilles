import {
  BoxBufferGeometry,SphereGeometry,
  Color,
  Mesh,
   GridHelper,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AudioListener,
  AudioLoader,
  AudioAnalyser,
  PositionalAudio,
} from "https://cdn.skypack.dev/three@0.132.2";

import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
//import { PositionalAudio } from "https://unpkg.com/browse/@types/three@0.140.0/src/audio/PositionalAudio.d.ts";
 

// create an AudioContext
/*const context = new AudioContext();

// create a user gesture event listener
document.addEventListener('click', () => {
  // resume the audio context
  context.resume().then(() => {
    console.log('Audio context resumed successfully');
  });
});*/
// Get a reference to the container element that will hold our scene
const container = document.querySelector("#scene-container");
			let analyser1, analyser2, analyser3;
// create a Scene
const scene = new Scene();
const spheres = [];
// Set the background color
//scene.background = new Color("skyblue");
scene.background = new Color("royalblue");
const hh= 500;
// Create a camera
const fov = 35; // AKA Field of View
const aspect = container.clientWidth / hh;
const near = 0.1; // the near clipping plane
const far = 9100; // the far clipping plane

const camera = new PerspectiveCamera(fov, aspect, near, far);
// move the camera back so we can view the scene
camera.position.set(0, 0, 10);

// create a geometry
const geometry = new BoxBufferGeometry(2, 2, 2);
const geometry1 = new SphereGeometry( 5, 32, 16 ); 
// create a default (white) Basic material
const material = new MeshBasicMaterial();

// create a Mesh containing the geometry and material
const cube = new Mesh(geometry, material);
const sphere = new Mesh(geometry1, material);
 
// add the mesh to the scene
scene.add(cube);

 

// create an AudioListener and add it to the camera
 
//const startButton0 = document.getElementById( 'startButton1' );
//startButton0.addEventListener( 'click', init1 );

 
const startButton1 = document.getElementById( 'startButton1' );
 startButton1.addEventListener( 'click', init );
const startButton2 = document.getElementById( 'startButton2' );
startButton2.addEventListener( 'click', init );
const startButton3 = document.getElementById( 'startButton3' );
startButton3.addEventListener( 'click', init );
const startButton4 = document.getElementById( 'startButton4' );
startButton4.addEventListener( 'click', init );
const startButton5 = document.getElementById( 'startButton5' );
startButton5.addEventListener( 'click', init );
 
function init1() {

  const overlay1 = document.getElementById( 'overlay1' );
 overlay1.remove();
}

 

// create a white grid
const size = 500;
const divisions = 20;
const gridHelper = new GridHelper(size, divisions);
gridHelper.material.opacity = 0.25;
gridHelper.material.transparent = true;
scene.add(gridHelper);





const recordButton = document.getElementById('recordButton');
let mediaRecorder;
let audio1; 
let audioUrl ;
recordButton.addEventListener('click', () => {
 
  
  navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
      
    });

    mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChunks);
        audioUrl = URL.createObjectURL(audioBlob);
      audio1= new Audio(audioUrl);
      //audio.play();
    });

    setTimeout(() => {
      mediaRecorder.stop();
      console.log('stop');
    }, 5000);

  });


});


const playerButton = document.getElementById('playerButton');


playerButton.addEventListener('click', () => {
 
  audio1.play();
 

  
  


});

 
// create UI button
 //const button = document.createElement("button");

// const startButton = document.getElementById('startButton');
//startButton.addEventListener('click', init);
let limit= 0;
function init() {
  const overlay = document.getElementById('overlay');
  limit++;
  if (limit>5)  overlay.remove();

  // create a new material with a random color
  const newMaterial = new MeshBasicMaterial({ color: Math.random() * 0xffffff });

  // create a new cube with the new material
  const newsphere= new Mesh(geometry1, newMaterial);

  // set the position of the new cube randomly within the grid
  const gridSize = (size / 255) / divisions;
  newsphere.position.set(
    (Math.random() - 0.5) * size/ 8,
    (Math.random() - 0.5) * size/ 8,
    (Math.random() - 0.5) * size/ 8
  );
 // newsphere.position.divideScalar(gridSize).round().multiplyScalar(gridSize);
 // set the position of the sphere to a random point on the x-z plane
 const radius = 10;
 const angle = Math.random() * Math.PI * 2;
 sphere.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);

  // create a new audio listener
  const listener = new AudioListener();
  camera.add(listener);

  // create a new audio source for the cube
  const sound = new PositionalAudio(listener);

  // load the audio file and set it as the audio source's buffer
  const audioLoader = new AudioLoader()//.8.mp3
  audioLoader.load(audioUrl, (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setRefDistance(2);
    sound.setVolume(2.5);
    sound.play();
  });

  // add the new cube and its audio source to the scene
  newsphere.add(sound);
  scene.add(newsphere);
    // store the sphere in an array for animation
    spheres.push(newsphere);
}

 //container.append(button);


 
// create the renderer
const renderer = new WebGLRenderer();

// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, hh);

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
// set the speed of the spheres' orbit
const speed = 0.001;
let time = 1110;

// define a function to render the scene
function render() {
  // request the next frame of the animation
  requestAnimationFrame(render);
  time += speed;
  // update the position of the cube
  updateCubePosition();

  // update the orbit controls
  controls.update();
 // rotate all spheres around the origin
 spheres.forEach((sphere, index) => {
  // calculate the sphere's new position based on the time elapsed and its orbit radius
  const radius = 110 + index * 2;
  const angle = (time * (index + 10))/10;
  sphere.position.set(
    Math.cos(angle) * radius,
    Math.cos(angle)*(index*radius/5),
    Math.sin(angle) * radius
  );
});

  // render the scene
  renderer.render(scene, camera);
}

// start the animation
render();
