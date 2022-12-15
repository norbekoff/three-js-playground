import * as THREE from "three";
import { GridHelper } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";

const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const scene = new THREE.Scene();
const orbit = new OrbitControls(camera, renderer.domElement);

const AxesHelper = new THREE.AxesHelper(20);

const geometry = new THREE.SphereGeometry(5, 20, 20);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const sphere = new THREE.Mesh(geometry, material);

const grid = new GridHelper(50, 30);
scene.add(grid);

camera.position.set(4, 1, 20);
orbit.update();

scene.add(sphere);
scene.add(AxesHelper);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);

let step = 0;
let speed = 0.01

function animate() {
  sphere.rotation.x += 0.001;
  sphere.rotation.y += 0.0001;

  step += speed
  sphere.position.y = (10 * Math.abs(Math.sin(step * 1)) + 5)

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

const options = {
  sphereColor: "#ffea00",
};

const gui = new GUI();
gui.addColor(options, "sphereColor").onChange(function (e) {
  sphere.material.color.set(e);
});
