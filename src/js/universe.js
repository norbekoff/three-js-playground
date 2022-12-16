import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import starsTexture from "../models/stars.jpg";
import sunTexture from "../models/real-sun.jpg";
import earthPic from "../models/earth.jpeg";

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const axesHelper = new THREE.AxesHelper(4);
const orbitControls = new OrbitControls(camera, renderer.domElement);
const gridHelper = new THREE.GridHelper(30, 30);
let sun = null;
let light = null;
let earth = null;
let earthObj = null;

camera.position.set(0, 27, 10);
orbitControls.update();
scene.add(axesHelper);
scene.add(orbitControls);
scene.add(gridHelper);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

renderLight();
addStarsToBackground();
renderSun();
renderEarth();
light.target = earth; // Point the light at the earth
animate();

document.body.appendChild(renderer.domElement);

function animate() {
  rotateEarth();
  rotateSun();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function addStarsToBackground() {
  scene.background = new THREE.CubeTextureLoader().load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
  ]);
}

function rotateSun() {
  sun.rotateY(0.0008);
}

function renderSun() {
  const sunTex = new THREE.TextureLoader().load(sunTexture);
  const sphereGeometry = new THREE.SphereGeometry(3);
  const sphereMaterial = new THREE.MeshBasicMaterial({ map: sunTex });
  sun = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sun);
}

function renderLight() {
  light = new THREE.DirectionalLight(0xffffff);
  light.position.y = 1;
  light.intensity = 2;
  light.position.set(0, 5, 0);
  helper = new THREE.DirectionalLightHelper(light, 5);
  scene.add(light);
  scene.add(helper);
}

function renderEarth() {
  const earthTexture = new THREE.TextureLoader().load(earthPic);

  const earthGeo = new THREE.SphereGeometry(2);
  const earthMaterial = new THREE.MeshLambertMaterial({ map: earthTexture });

  earthObj = new THREE.Object3D();
  earth = new THREE.Mesh(earthGeo, earthMaterial);
  earth.position.x = 16;
  earthObj.add(earth);
  scene.add(earthObj);
}

function rotateEarth() {
  earthObj.rotateY(0.002);
  earth.rotateY(0.001);
}
