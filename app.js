import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

// Plane with Depth

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const light = new THREE.DirectionalLight(0xffffff, 1);
const backLight = new THREE.DirectionalLight(0xffffff, 1);
const renderer = new THREE.WebGLRenderer();
const plane = new THREE.PlaneGeometry(15, 15, 15, 15); // Height, width, width seg, height seg
const mat = new THREE.MeshPhongMaterial({
  // color: 0x000000,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
  vertexColors: true,
});
const mesh = new THREE.Mesh(plane, mat);
const { array } = mesh.geometry.attributes.position;

const mouse = {
  x: undefined,
  y: undefined,
};

const raycaster = new THREE.Raycaster();

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;

light.position.set(0, 0, 1);
backLight.position.set(0, 0, -1);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.setClearColor(0xdddddd, 1);

scene.add(mesh, light, backLight);
document.body.appendChild(renderer.domElement);
// new OrbitControls(camera, renderer.domElement); // Adds mouse moving feature

// Gives different depths
for (let i = 0; i < array.length; i += 3) {
  const z = array[i + 2];

  array[i + 2] = z + Math.random();
}

const colors = [];

for (let i = 0; i < mesh.geometry.attributes.position.count; i++) {
  colors.push(0, 0, 0);
}

mesh.geometry.setAttribute(
  "color",
  new THREE.BufferAttribute(new Float32Array(colors), 3)
);

function animation() {
  requestAnimationFrame(animation);
  renderer.render(scene, camera);

  raycaster.setFromCamera(mouse, camera);
  const intersetion = raycaster.intersectObject(mesh);

  if (intersetion.length > 0) {
    const { color } = intersetion[0].object.geometry.attributes;

    const normal = {
      r: 0,
      g: 0,
      b: 0,
    };
    const hover = {
      r: 1,
      g: 1,
      b: 1,
    };

    gsap.to(hover, {
      r: normal.r,
      g: normal.g,
      b: normal.b,
      duration: 1,

      onUpdate: () => {
        color.setX(intersetion[0].face.a, hover.r);
        color.setZ(intersetion[0].face.a, hover.b);
        color.setY(intersetion[0].face.a, hover.g);

        color.setX(intersetion[0].face.b, hover.r);
        color.setY(intersetion[0].face.b, hover.g);
        color.setZ(intersetion[0].face.b, hover.b);

        color.setY(intersetion[0].face.c, hover.g);
        color.setX(intersetion[0].face.c, hover.r);
        color.setZ(intersetion[0].face.c, hover.b);

        color.needsUpdate = true;
      },
    });
  }
}

animation();

addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Plane

// const scene = new THREE.Scene();
// const cam = new THREE.PerspectiveCamera(
//   35,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// const light = new THREE.DirectionalLight(0xffffff, 0.5);
// const plane = new THREE.PlaneGeometry(1, 1, 1, 1);
// const material = new THREE.MeshPhongMaterial({
//   color: 0x0000ff,
//   side: THREE.DoubleSide,
//   flatShading: THREE.FlatShading,
//   vertexColors: true,
// });
// const render = new THREE.WebGLRenderer();
// const mesh = new THREE.Mesh(plane, material);

// cam.position.z = 5;
// light.position.set(0, 0, 2);
// render.setSize(window.innerWidth, window.innerHeight);
// render.setPixelRatio(devicePixelRatio);
// render.setClearColor(0xffffff, 1);
// document.body.appendChild(render.domElement);
// scene.add(mesh, light);

// function animation() {
//   requestAnimationFrame(animation);
//   mesh.rotation.y += 0.01;
//   render.render(scene, cam);
// }

// animation();

// Cube

// const scene = new THREE.Scene();
// const cam = new THREE.PerspectiveCamera(
//   35,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// const light = new THREE.DirectionalLight(0xffffff, 0.5);
// const render = new THREE.WebGLRenderer();
// const box = new THREE.BoxGeometry(1, 1, 1); // x, y, z -> for cube
// const material = new THREE.MeshBasicMaterial({ color: 0x2222ff });
// const mesh = new THREE.Mesh(box, material);

// cam.position.z = 5;
// light.position.set(0, 0, 1);
// render.setSize(window.innerWidth, window.innerHeight);
// render.setPixelRatio(devicePixelRatio);
// render.setClearColor(0xffffff, 1);
// document.body.appendChild(render.domElement);
// scene.add(mesh, light);

// function animation() {
//   requestAnimationFrame(animation);
//   mesh.rotation.y += 0.01;
//   render.render(scene, cam);
// }

// animation();
