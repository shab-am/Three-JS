import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 1.3, 1.3),
    new THREE.MeshBasicMaterial({color: '#F08080'})
)
cube1.position.set(-5,  1.5, 0)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 1.3, 1.3),
    new THREE.MeshBasicMaterial({color: '#008080'})
)
cube2.position.set(0,  1.5, 0)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 1.3, 1.3),
    new THREE.MeshBasicMaterial({color: '#98FF98'})
)
cube3.position.set(5, 1.5, 0)

const cube4 = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 1.3, 1.3),
    new THREE.MeshBasicMaterial({color: '#FFE4E1'})
)
cube4.position.set(-2.5, -3, 0)

const cube5 = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 1.3, 1.3),
    new THREE.MeshBasicMaterial({color: '#AFEEEE'})
)
cube5.position.set(2.5, -3, 0)

group.add(cube1)
group.add(cube2)
group.add(cube3)
group.add(cube4)
group.add(cube5)

let time = Date.now()
const clock = new THREE.Clock()
const tick = () => {
    cube1.rotation.x += 0.01
    cube1.rotation.y += 0.01

    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    cube2.rotation.y += 0.01 * deltaTime

    const elapsedTime = clock.getElapsedTime()
    cube3.rotation.x = elapsedTime

    cube4.position.y = 2 * Math.sin(elapsedTime)

    cube5.position.y = 2 * Math.cos(elapsedTime)

    // Circular camera movement
    const radius = 9;
    camera.position.x = radius * Math.sin(elapsedTime)
    camera.position.z = radius * Math.cos(elapsedTime)
    camera.lookAt(scene.position)  // Look at the center of the scene

    window.requestAnimationFrame(tick)
    renderer.render(scene, camera)
}

tick()
