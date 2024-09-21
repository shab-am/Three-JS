import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./static/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./static/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./static/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./static/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('./static/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('./static/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('./static/textures/door/roughness.jpg')

const matcapTexture = textureLoader.load('./static/textures/matcaps/1.png')

const gradientTexture = textureLoader.load('./static/textures/gradients/3.jpg')

const scene = new THREE.Scene();

const material = new THREE.MeshBasicMaterial();
material.map = doorColorTexture
material.color = new THREE.Color(0x00ff00)
material.wireframe = true

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)

sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32), 
    material
)

torus.position.x = 1.5

scene.add(sphere, plane, torus);

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

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = 0.15 * elapsedTime;
    plane.rotation.x = 0.15 * elapsedTime;
    torus.rotation.x = 0.15 * elapsedTime;

    controls.enableDamping = true
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
