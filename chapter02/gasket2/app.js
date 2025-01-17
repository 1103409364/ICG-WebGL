import { createProgram, setupWebGL, pointsToBuffer } from "GLHelper";
import { vec2 } from "gl-matrix";

import vertexShader from "./shader.vert";
import fragmentShader from "./shader.frag";

let gl;

const points = [];
const numTimesToSubdivide = 5;

function divideTriangle(a, b, c, count = numTimesToSubdivide) {
  if (count <= 0) {
    points.push(a, b, c);
  } else {
    const ab = vec2.lerp(vec2.create(), a, b, 0.5);
    const ac = vec2.lerp(vec2.create(), a, c, 0.5);
    const bc = vec2.lerp(vec2.create(), b, c, 0.5);

    --count;

    divideTriangle(a, ab, ac, count);
    divideTriangle(c, ac, bc, count);
    divideTriangle(b, bc, ab, count);
  }
}

function init() {
  const canvas = document.getElementById("gl-canvas");
  gl = setupWebGL(canvas);

  if (!gl) {
    console.error("WebGL isn't available");
  }

  //
  //  Initialize our data for the Sierpinski Gasket
  //

  // First, initialize the corners of our gasket with three points.

  const vertices = [vec2.fromValues(-1, -1), vec2.fromValues(0, 1), vec2.fromValues(1, -1)];

  divideTriangle(...vertices);

  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers

  const program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  // Load the data into the GPU

  const bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, pointsToBuffer(points), gl.STATIC_DRAW);
  // Associate out shader variables with our data buffer

  const vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, points.length);
}

init();
