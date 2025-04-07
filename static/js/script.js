import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, car, motorcycle, road;

function init() {
    // Escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Cielo azul

    // Cámara
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 15); // Posición inicial de la cámara

    // Renderizador
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Controles de órbita para la cámara (interacción)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    // Luces
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Carretera (un simple plano)
    const roadGeometry = new THREE.PlaneGeometry(50, 200);
    const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x696969, side: THREE.DoubleSide });
    road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2; // Rotar para que sea horizontal
    scene.add(road);

    // Coche (placeholder - un cubo)
    const carGeometry = new THREE.BoxGeometry(2, 1, 4);
    const carMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    car = new THREE.Mesh(carGeometry, carMaterial);
    car.position.set(-3, 0.5, 0);
    scene.add(car);

    // Moto (placeholder - una esfera)
    const motorcycleGeometry = new THREE.SphereGeometry(0.75, 32, 32);
    const motorcycleMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    motorcycle = new THREE.Mesh(motorcycleGeometry, motorcycleMaterial);
    motorcycle.position.set(3, 0.75, 5);
    scene.add(motorcycle);

    // Animación
    animate();
}

let carSpeed = 0.05;
let motorcycleSpeed = 0.1;

function animate() {
    requestAnimationFrame(animate);

    // Movimiento básico de los vehículos
    car.position.z -= carSpeed;
    motorcycle.position.z -= motorcycleSpeed;

    // Reiniciar posición si salen de la vista
    if (car.position.z < -100) {
        car.position.z = 100;
    }
    if (motorcycle.position.z < -100) {
        motorcycle.position.z = 100;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

init();