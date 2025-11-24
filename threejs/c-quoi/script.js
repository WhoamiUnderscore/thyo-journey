import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';

const element = document.querySelector("div#scene");
const el_size = element.getBoundingClientRect();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, el_size.width / el_size.height, 0.1, 100 );

const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setClearColor( 0xffffff, 0 );
renderer.setSize( el_size.width, el_size.height );
element.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 1.5;


function loop() {
  cube.rotation.y += 1 / 60;
  renderer.render( scene, camera );

  saveCameraImage()
}
renderer.setAnimationLoop( loop );

function saveCameraImage() {
  camera.imageData = renderer.domElement.toDataURL();

  let link = document.querySelector("link[rel~='icon']");

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.href = camera.imageData;
}

