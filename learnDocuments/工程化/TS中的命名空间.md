# Typescript 中的命名空间

## 特性：

- 如果需要再全局使用命名空间中的变量，需要使用 export 导出,没有使用 export 导出的只能在命名空间内使用

```typescript
// a.ts
namespace Shape {
  const pi = Math.PI;
  export function circle(r: number) {
    return pi * r ** 2;
  }
}
```

- 不同文件中，同名的命名空间共享

```typescript
// b.ts
namespace Shape {
  export function square(x: number) {
    return x * x;
  }
}

Shape.circle(2); // 可以调用a.ts文件中的circle
Shape.square(2);
```

- 命名空间和模块不要混用（不要在一个模块中使用命名空间），命名空间最好在一个全局的环境中使用
  - 需要将有命名空间的文件编译成 js 文件，然后在全局中（比如 index.html）引用
- 命名空间的别名 (这样直接调用 circle 就行了，不用加 Shape 前缀了)
  - 使用 import 来生命别名，这个 import 和引入文件时候的 import 没有关系

```typescript
import circle = Shape.circle;
circle(3);
```
