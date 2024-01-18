import "./style.css";

import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector("#bg")!,
});

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 20, 100);
controls.update();

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

//Draw X
const xMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });

const xPoints = [];
xPoints.push(new THREE.Vector3(0, 0, 0));
xPoints.push(new THREE.Vector3(10, 0, 0));

const xGeometry = new THREE.BufferGeometry().setFromPoints(xPoints);

const xLine = new THREE.Line(xGeometry, xMaterial);

scene.add(xLine);

//Draw Z
const zMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });

const zPoints = [];
zPoints.push(new THREE.Vector3(0, 0, 0));
zPoints.push(new THREE.Vector3(0, 10, 0));

const zGeometry = new THREE.BufferGeometry().setFromPoints(zPoints);

const zLine = new THREE.Line(zGeometry, zMaterial);

scene.add(zLine);

//Draw Y
const yMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

const yPoints = [];
yPoints.push(new THREE.Vector3(0, 0, 0));
yPoints.push(new THREE.Vector3(0, 0, 10));

const yGeometry = new THREE.BufferGeometry().setFromPoints(yPoints);

const yLine = new THREE.Line(yGeometry, yMaterial);

scene.add(yLine);

camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

let oldX = 10;
let oldY = 10;
let oldZ = 10;

let currentX = 10;
let currentY = 10;
let currentZ = 10;

let selectedBtn: string | undefined;

function drawLine() {
	const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

	const points = [];
	points.push(new THREE.Vector3(oldX, oldZ, oldY));
	points.push(new THREE.Vector3(currentX, currentZ, currentY));

	const geometry = new THREE.BufferGeometry().setFromPoints(points);

	const line = new THREE.Line(geometry, material);

	scene.add(line);
}


function animate() {
	requestAnimationFrame(animate);

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render(scene, camera);
}

document.addEventListener("mouseover", (event) => {
	if (event.target == null) return;
  //@ts-ignore
	switch (event.target.id) {
		case "x":
			console.log("selected x");
      selectedBtn = 'x'
			break;
		case "y":
			console.log("selected y");
      selectedBtn = 'y'
			break;
		case "z":
			console.log("selected z");
      selectedBtn = 'z'
			break;
		case "bg":
			console.log("bg");
      selectedBtn = undefined
			break;
	}
});

document.addEventListener("wheel", (event) => {
  let change = event.deltaY / -Math.abs(event.deltaY)
  if ( selectedBtn == undefined ) return;
  switch(selectedBtn) {
    case 'x':
      currentX += change;
      break;
    case 'y':
      currentY += change;
      break;
    case 'z':
      currentZ += change
      break;
  }

  drawLine();

  oldX = currentX;
	oldY = currentY;
	oldZ = currentZ;
});

animate();
