// This fragment shader assigns a color to a fragment based on the
// color value passed from the vertex shader.

precision mediump float;
varying vec4 fColor;

void main() {
  gl_FragColor = fColor;
}