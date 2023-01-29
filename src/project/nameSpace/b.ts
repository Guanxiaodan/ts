/// <reference path="a.ts"/>
// 上面的 “/// <reference path="a.ts"/>”是将a.ts进行引入

// 与a.ts中的Shape共享一个命名空间
namespace Shape {
  export function square(x: number) {
    return x * x;
  }
}

Shape.circle(2); // 这里直接调用a.ts的circle方法，在编译时候会报错，需要使用三斜杠引入a.ts文件
Shape.square(2);

// 命名空间的别名 (这样直接调用circle就行了，不用加Shape前缀了)
import circle = Shape.circle;
circle(3);
