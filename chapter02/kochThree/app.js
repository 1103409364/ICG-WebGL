import * as THREE from "three";
import { vec3 } from "gl-matrix";

const points = [];
const MAX_DEPTH = 4;

function divideLineSegment(a, b, depth = 0) {
  const c = vec3.lerp(a, b, 1 / 3);
  const d = vec3.lerp(a, b, 2 / 3);
  const e = vec3.rotateZ(d, c, Math.PI / 3);
  if (depth < MAX_DEPTH) {
    depth++;
    divideLineSegment(a, c, depth);
    divideLineSegment(c, e, depth);
    divideLineSegment(e, d, depth);
    divideLineSegment(d, b, depth);
  } else {
    points.push(a, c, e, d, b);
  }
}

function divideTriangle(a, b, c) {
  divideLineSegment(a, b);
  divideLineSegment(b, c);
  divideLineSegment(c, a);
}

function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 2;
  camera.lookAt(new THREE.Vector3(0, 0, -1));
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(new THREE.Color(0xffffff));
  renderer.setSize(512, 512);

  const vertices = [vec3(-0.5, -0.5, 0), vec3(0, 0.5, 0), vec3(0.5, -0.5, 0)];

  divideTriangle(...vertices);
  // To convert the Geometry to BufferGeometry:
  // 1. Replace the THREE.Geometry instance with THREE.BufferGeometry.
  // 2. Create a Float32Array to store the vertex data.
  // 3. Iterate over the points array and push the x, y, and z coordinates of each vertex to the Float32Array.
  // 4. Set the attribute of the BufferGeometry to the Float32Array using the setAttribute() method.
  // 5. Update any references to the vertices property of the THREE.Geometry instance to refer to the new BufferAttribute instance.
  const vertexData = new Float32Array(points.length * 3);
  let index = 0;
  points.forEach((e) => {
    vertexData[index++] = e[0];
    vertexData[index++] = e[1];
    vertexData[index++] = e[2];
  });

  const bufferGeometry = new THREE.BufferGeometry();
  bufferGeometry.setAttribute("position", new THREE.BufferAttribute(vertexData, 3));

  const material = new THREE.LineBasicMaterial({
    opacity: 1.0,
    linewidth: 1,
    color: 0xff0000,
  });

  const line = new THREE.Line(bufferGeometry, material);

  scene.add(line);

  document.getElementById("gl-canvas").appendChild(renderer.domElement);

  renderer.render(scene, camera);
}

init();
