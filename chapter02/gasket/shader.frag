// 这段代码是一个简单的片段着色器(shader)程序。它定义了一个内置变量gl_FragColor，该变量负责输出像素颜色值。
// 在这里，每个像素的颜色值被设置为“红色”，即RGBA的四个分量分别为1.0, 0.0, 0.0和1.0。
// `precision mediump float;` 指定使用中等精度模式处理浮点数。
// `gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);` 设置像素颜色值，将其赋值给内置的变量gl_FragColor。
// vec4表示一个四维向量，前三个元素对应RGBA的四个分量。在此情况下，只有红色分量设置为完全不透明，所以我们得到纯红色的输出。

precision mediump float;

void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
