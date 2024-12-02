import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const canvas = document.getElementById('canvas');


//1. Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#fffede');

//2. Camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/ window.innerHeight,0.1,1000);

camera.position.z = 5;

//3. object
const geometry = new THREE.TetrahedronGeometry(1);
const material = new THREE.MeshPhongMaterial({
  color: 0xa1123d, // Base color
  emissive: 0x00ff00, // Emissive color (green glow)
  emissiveIntensity: 1, // Intensity of emissive light
  shininess: 100, // Specular shininess
});





const dodecahedron = new THREE.Mesh(geometry, material);


const ringGeometry = new THREE.TorusGeometry(1.2, 0.13, 16, 100);
const ringMaterial = new THREE.MeshPhongMaterial({
  color: 0xa1123d,
  shininess: 100,
  specular: 0x00ff00,
});


const ring = new THREE.Mesh(ringGeometry, ringMaterial)





const boxGeometry = new RoundedBoxGeometry(2, 0.1, 2, 100,0.4);
const boxMaterial = new THREE.MeshPhongMaterial({
  color: 0x204799,
  shininess: 100,
  specular: 0xf75ecd,
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);

box.position.y = -1.5;


scene.add(dodecahedron);
scene.add(box);
scene.add(ring);


//4. light

const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(1,1,1);
scene.add(light);


//5. renderer

const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);




//6.  add orbit
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping= true;

controls.dampingFactor= 0.05;
controls.enableZoom = true;
controls.enablePan = true;


//7. add animation


function animate(){
  requestAnimationFrame(animate);
  dodecahedron.rotation.x += 0.02;
  dodecahedron.rotation.y += 0.02;
  ring.rotation.y += 0.01;
  ring.rotation.x += 0.03;
  box.rotation.y += 0.005;
  
  
  controls.update();
  renderer.render(scene, camera);
}

animate();



//8. handle Resize

window.addEventListener("resize", ()=>{
  camera.aspect = window.innerWidth/ window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  
})

