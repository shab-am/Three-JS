import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// BTS working of textures
// const image = new Image();
// const texture = new THREE.Texture(image);

// image.onload = () => {
//     texture.needsUpdate = true;
// }

// image.src = './th.jpeg';


// Easy implementation of textures using texture loader class
// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load('./th.jpeg');

// Using loading manager
const loadingManager = new THREE.LoadingManager();

const textureLoader = new THREE.TextureLoader(loadingManager);
const doorTexture = textureLoader.load('./th.jpeg');

// doorTexture.repeat.x = 2
// doorTexture.repeat.y = 3
// doorTexture.wrapS = THREE.MirroredRepeatWrappingRepeatWrapping;
// doorTexture.wrapT = THREE.MirroredRepeatWrappingRepeatWrapping;

// doorTexture.offset.x = 0.5
// doorTexture.offset.y = 0.5

// doorTexture.rotation = Math.PI / 4;
// doorTexture.center.x = 0.5;
// doorTexture.center.y = 0.5;

doorTexture.minFilter = THREE.NearestFilter
doorTexture.magFilter = THREE.NearestFilter

const scene = new THREE.Scene();
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshBasicMaterial({ map: doorTexture })
);
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
// controls.enableZoom = false; 

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
