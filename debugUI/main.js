import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'lil-gui'; 
import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
    const gui = new GUI({ width: 400 });

    window.addEventListener('keydown', (event) => {
        if(event.key === 'h') {
            if(gui._hidden)
                gui.show();
            else
                gui.hide();
        }
    })

    const parameters = {
        color: 0xffff00,
        spin: () => {
            gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10})
        }
    }  

    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: parameters.color }); 
    const mesh = new THREE.Mesh(geometry, material);
       
    scene.add(mesh);

    gui
        .add(mesh.position, 'y')
        .min(-3)
        .max(3)
        .step(0.01)
        .name('Elevation')

    gui 
        .add(mesh, 'visible')
    
    gui 
        .add(material, 'wireframe')
    
    gui 
        .addColor(parameters, 'color')
        .onChange(() => {
            material.color.set(parameters.color);
        })

    gui
        .add(parameters, 'spin')
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
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
});
