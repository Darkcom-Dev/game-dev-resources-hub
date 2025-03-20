// Importar módulos de Three.js
import * as THREE from 'https://esm.sh/three@0.128.0/build/three.module.js';
import { GLTFLoader } from 'https://esm.sh/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://esm.sh/three/examples/jsm/controls/OrbitControls.js';

// Configuración básica de la escena
let scene, camera, renderer, controls;

// Función para inicializar la escena
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
  const light = new THREE.DirectionalLight(0xffffff, 
    3,
  );
  light.position.set(5, 5, 5).normalize();
  light.target.position.set(0, 0, 0).normalize();
  light.castShadow = true;
  scene.add(light);

  // Fondo
  const cubemap = new THREE.CubeTextureLoader().load([
    'static/cubemap/posx.jpg',
    'static/cubemap/negx.jpg',
    'static/cubemap/posy.jpg',
    'static/cubemap/negy.jpg',
    'static/cubemap/posz.jpg',
    'static/cubemap/negz.jpg'
  ]);
  scene.background = new THREE.Color( 0xbfe3dd );
  scene.fog = new THREE.Fog( 0xbfe3dd, 1, 15 );
  scene.environment = cubemap;
  // Controles de vuelo
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set( 0, 0.5, 0 );
	controls.update();
	controls.enablePan = false;
	controls.enableDamping = true;
}

// Función para cargar un modelo GLB
async function loadGLBModel(path, scale = 1, position = { x: 0, y: 0, z: 0 }) {
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(path);
  const model = gltf.scene;
  model.scale.set(scale, scale, scale);
  model.position.set(position.x, position.y, position.z);
  scene.add(model);
}

// Función para animar la escena
function animate() {
  requestAnimationFrame(animate);
  controls.update(0.01);
  renderer.render(scene, camera);
}

// Inicializar la escena y cargar el modelo
initScene();
loadGLBModel('static/models/park-shrine-walls-stairs-floors.glb', 1, { x: 0, y: 0, z: 0 }).then(() => {
  animate();
});

// Ajustar el tamaño del renderer al cambiar el tamaño de la ventana
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});