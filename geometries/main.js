import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
// const geometry = new THREE.BoxGeometry(2, 2, 2, 4, 4, 4);

// const positionsArray = new Float32Array(9)

// positionsArray[0] = 0 
// positionsArray[1] = 0 
// positionsArray[2] = 0

// positionsArray[3] = 0 
// positionsArray[4] = 1
// positionsArray[5] = 0 

// positionsArray[6] = 1
// positionsArray[7] = 0 
// positionsArray[8] = 0 

const geometry = new THREE.BufferGeometry()

const count = 200;
const positionsArray = new Float32Array(count * 3 * 3)

for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4
}

const positionsAttributes = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttributes)

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
})
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const canvas = document.querySelector('canvas.webgl');

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, canvas);
controls.enableZoom = false;

window.addEventListener('resize', () => {
    // Update sizes
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update camera
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
