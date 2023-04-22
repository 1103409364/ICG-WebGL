// 这段代码是一个简单的顶点着色器(shader)程序。它定义了一个输入变量vPosition，其类型为vec4，
// 代表一个四维向量，用于存储顶点的位置信息。在这里，该变量被声明为attribute，表示它是通过缓冲区对象传递到shader中来的。
// `gl_PointSize = 1.0;` 设置点的大小为1.0像素。
// `gl_Position = vPosition;` 将输入变量vPosition赋值给内置变量gl_Position，以便将当前顶点设置为片段着色器的输入，同时对其进行处理后输出。

attribute vec4 vPosition;

void main() {
  gl_PointSize = 1.0;
  gl_Position = vPosition;
}
