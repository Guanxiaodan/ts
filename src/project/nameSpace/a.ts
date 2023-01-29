// 如果希望变量在全局范围内可见的话，就需要使用export 导出
namespace Shape {
  const pi = Math.PI;
  export function circle(r: number) {
    return pi * r ** 2;
  }
}
