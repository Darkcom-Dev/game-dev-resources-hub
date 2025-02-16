// Importar Three.js desde esm.sh
import * as THREE from 'https://esm.sh/three';

// Importar GLTFLoader desde esm.sh
import { GLTFLoader } from 'https://esm.sh/three/examples/jsm/loaders/GLTFLoader.js';

// Configuración básica de la escena
let scene, camera, renderer;

function initScene() {
  // Escena
  scene = new THREE.Scene();

  // Cámara
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Luz
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5).normalize();
  scene.add(light);
}

// Cargar modelo GLB
function loadGLBModel(path, scale = 1, position = { x: 0, y: 0, z: 0 }) {
  const loader = new GLTFLoader();

  loader.load(
    path,
    (gltf) => {
      const model = gltf.scene;
      model.scale.set(scale, scale, scale);
      model.position.set(position.x, position.y, position.z);
      scene.add(model);
    },
    undefined,
    (error) => {
      console.error("Error al cargar el modelo GLB:", error);
    }
  );
}

// Animación
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Ajustar el tamaño del renderer al cambiar el tamaño de la ventana
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Inicializar y cargar el modelo
initScene();
loadGLBModel("static/models/park-shrine-walls-stairs-floor.glb", 1, { x: 0, y: 0, z: 0 }); // Cambia la ruta y parámetros según el modelo
animate();
