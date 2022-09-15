// 函数类型的接口

// 用变量定义一个函数类型
let add2: (x: number, y: number) => number;

// 用接口定义一个函数类型
// 不需要定义函数名称，只需要定义参数类型和返回值类型
interface Add {
  (x: number, y: number): number;
}

// 上面两种写法是等价的

// 更简洁的一种定义方式：类型别名
// 就是为这个函数类型起一个名字，这个函数类型叫Add2
type Add2 = (x: number, y: number) => number;
// add3就是函数的具体实现
let add3: Add2 = (a, b) => a + b;

// 混合接口
// Lib类型是个没有返回值的函数，同时还有两个属性version，doSomething()
interface Lib {
  (): void;
  version: string;
  doSomething(): void;
}

let lib: Lib = (() => {}) as Lib;
lib.version = "1.0";
lib.doSomething = () => {};

// 但上面这个lib只是Lib的单例，我们可以用函数进行封装方便创造多个实例
function getLib() {
  let lib: Lib = (() => {}) as Lib;
  lib.version = "1.0";
  lib.doSomething = () => {};
  return lib;
}

let lib1 = getLib();
lib1.doSomething();
let lib2 = getLib();
console.log(lib2.version);
