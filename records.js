/*const recordButton = document.querySelector('#recordButtonx');
const stopButton = document.querySelector('#stopButtonx');
const playButton = document.querySelector('#playButtonx');

let recordedChunks = [];
let mediaRecorder;

recordButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);
playButton.addEventListener('click', playRecording);

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordButton.disabled = true;
    stopButton.disabled = false;
    playButton.disabled = true;
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=opus'
    });
    mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
    mediaRecorder.start();
  } catch (e) {
    console.error('Failed to record', e);
  }
}

function handleDataAvailable(event) {
  recordedChunks.push(event.data);
}

function stopRecording() {
  recordButton.disabled = false;
  stopButton.disabled = true;
  playButton.disabled = false;
  mediaRecorder.stop();
}

function playRecording() {
  const blob = new Blob(recordedChunks, { type: 'audio/webm' });
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.play();
}*/

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

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
  Audio,
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
scene.add(cube);

// create the renderer
const renderer = new WebGLRenderer();

// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, hh);

// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);
// define a function to render the scene
function render() {
  // request the next frame of the animation
  requestAnimationFrame(render);
 
 

  // update the orbit controls
  
  // render the scene
  renderer.render(scene, camera);
}

// start the animation
render();






const recordButton = document.getElementById('recordButton');
let mediaRecorder;

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
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    });

    setTimeout(() => {
      mediaRecorder.stop();
      console.log('stop');
    }, 5000);

  });


});

