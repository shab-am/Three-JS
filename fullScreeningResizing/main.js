import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 5
scene.add(camera)

window.addEventListener('resize', () => {
    //update sizes
    const width = window.innerWidth;
    const height = window.innerHeight;

    //update camera
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    //update renderer
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        document.body.requestFullscreen(); 
    } else {
        document.exitFullscreen();
    }
});

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

animate();
