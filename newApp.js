import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

let container1;
let container2;
let cam1;
let cam2;
let render1;
let render2;
let scene1;
let scene2;
let house;
let shoe;

function houseShow() {
  container1 = document.querySelector(".scene1");
  scene1 = new THREE.Scene();

  const fov = 25;
  const near = 0.1;
  const far = 1000;
  const aspect = container1.clientWidth / container1.clientHeight;

  cam1 = new THREE.PerspectiveCamera(fov, aspect, near, far);
  cam1.position.set(0, 3, 30);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene1.add(ambient, light);

  render1 = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  render1.setSize(container1.clientWidth, container1.clientHeight);
  render1.setPixelRatio(window.devicePixelRatio);

  container1.appendChild(render1.domElement);

  let loader = new GLTFLoader();
  loader.load("./house/scene.gltf", function (gltf) {
    scene1.add(gltf.scene);
    house = gltf.scene.children[0];
    ani1();
  });
}

function shoeShow() {
  container2 = document.querySelector(".scene2");
  scene2 = new THREE.Scene();

  const fov = 25;
  const near = 0.1;
  const far = 1000;
  const aspect = container2.clientWidth / container2.clientHeight;

  cam2 = new THREE.PerspectiveCamera(fov, aspect, near, far);
  cam2.position.set(0, 1, 30);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene2.add(ambient, light);

  render2 = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  render2.setSize(container2.clientWidth, container2.clientHeight);
  render2.setPixelRatio(window.devicePixelRatio);

  container2.appendChild(render2.domElement);

  let loader = new GLTFLoader();
  loader.load("./shoe/scene.gltf", function (gltf) {
    scene2.add(gltf.scene);
    shoe = gltf.scene.children[0];
    ani2();
  });
}

function ani1() {
  requestAnimationFrame(ani1);
  house.rotation.z += 0.005;
  render1.render(scene1, cam1);
}

function ani2() {
  requestAnimationFrame(ani2);
  shoe.rotation.z += 0.005;
  render2.render(scene2, cam2);
}

shoeShow();
houseShow();

function onWindowResize() {
  cam1.aspect = container1.clientWidth / container1.clientHeight;
  cam1.updateProjectionMatrix();

  render1.setSize(container1.clientWidth, container1.clientHeight);

  cam2.aspect = container2.clientWidth / container2.clientHeight;
  cam2.updateProjectionMatrix();

  render2.setSize(container2.clientWidth, container2.clientHeight);
}

window.addEventListener("resize", onWindowResize);
