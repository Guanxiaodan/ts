// Typescript 的类型检查机制
// 如果不指定变量类型，ts会将其推断为any类型
let a;
// 如果给变量赋值了，ts会根据所赋的值的类型推断出变量的类型
let b = 1;

// 最佳通用类型推断
// 当需要从多个类型中推断出一个类型的时候，TS会尽可能推断出一个兼容当前所有类型的通用类型

// 上下文类型推断
// 通常发生在事件处理中;
// 下面这个例子中，这时候event就被推断为了KeyboardEvent类型。并且能推断出来event的属性有哪些
window.onkeydown = (event) => {
  console.log(event.bubbles);
};

// 类型断言
// 有时候TS的类型推断不符合预期，而且开发者有自信比TS更了解代码，这时候就可以使用类型断言来覆盖ts的类型推断
let foo = {};
// foo.bar = 1; // 这个时候会报错，因为foo中没有bar属性

// 可以通过类型断言来解决
interface Foo {
  bar: number;
}
let foo2 = {} as Foo;
foo2.bar = 2;

// 但是类型断言使用需要注意，避免带来隐患

// 接口的兼容性
// 数量少的可以兼容数量多的，我要的你有就行
interface X {
  a: number;
  b: number;
}

interface Y {
  a: number;
  b: number;
  c: number;
}
let x: X = { a: 1, b: 2 };
let y: Y = { a: 1, b: 2, c: 3 };
x = y;
// y=x  y不能兼容x

// 函数的兼容性
// 参数个数的要求
// 这里的Handler就是目标类型，要传入的参数就是源类型
// 参数多的可以兼容参数少的
type Handler = (a: number, b: number) => void;
function hof(handler: Handler) {
  return handler;
}
let handler1 = (a: number) => {};
hof(handler1);
let handler2 = (a: number, b: number, c: number) => {};
// hof(handler2); 参数多的不能赋值给参数少的

// #### 可选参数和剩余参数
// 固定参数可以兼容可选参数和剩余参数
// 剩余参数可以兼容固定参数和可选参数
// 可选参数不兼容固定参数和剩余参数 （可以设置strictFunctionTypes:false，来让其兼容）
let m = (p1: number, p2: number) => {};
let n = (p1?: number, p2?: number) => {};
let v = (...args: number[]) => {};
m = n;
m = v;
v = m;
v = n;
n = m;
n = v;

// 参数类型的要求
let handler4 = (a: string) => {};
// hof(handler4); // 参数类型不兼容

// 对于对象参数的类型判断
interface Point3D {
  x: number;
  y: number;
  z: number;
}
interface Point2D {
  x: number;
  y: number;
}

let p3d = (point: Point3D) => {};
let p2d = (point: Point2D) => {};
p3d = p2d;
// p2d = p3d  // p2d不兼容p3d,参数给多了，要不起

// 函数的返回值类型的兼容
// 目标函数的返回值类型必须与原函数的返回值类型相同，或者为其子类型
let f1 = () => ({ name: "Alice" });
let f2 = () => ({ name: "Alice", location: "Beijing" });
f1 = f2;
// f2=f1 // 不行，反正到函数这里就是少的兼容多的

// 函数重载
function overload1(a: number, b: number): number; // 目标函数
function overload1(a: string, b: string): string; // 目标函数
function overload1(a: any, b: any): any {
  return a + b;
} // 原函数

// 重载列表中目标函数的参数要多于原函数的参数

// 枚举类型的兼容性
// 枚举类型和数值类型是相互兼容的

enum Fruit {
  Apple,
  Banana,
}
enum Color {
  Red,
  Pink,
}
let fruit: Fruit.Apple = 3;
let num2: number = Fruit.Apple;

// 枚举类型之间是完全不兼容的
// let color: Color.Pink = Fruit.Apple; // 是无法兼容的

// 类的兼容性
// 与接口的兼容性相似
// 构造函数和静态成员不进行比较，但私有成员不相互兼容
// 如果两个类具有相同的实例成员，那么这两个实例就可以相互兼容

// 泛型的兼容性
interface Empty<T> {}
let obj1: Empty<number> = {};
let obj3: Empty<string> = {};
obj1 = obj3;

// 只有类型参数T被接口成员使用的时候，才会影响泛型的兼容性
interface Empty2<T> {
  val: T;
}
let obj4: Empty2<number> = { val: 2 };
let obj5: Empty2<string> = { val: "a" };
// obj4 = obj5; // 不兼容

// 泛型函数的兼容性
let logs1 = <T>(x: T): T => {
  console.log("x");
  return x;
};
let logs2 = <U>(y: U): U => {
  console.log("y");
  return y;
};
logs1 = logs2;

// 结构之间兼容：成员少的兼容成员多的
// 函数之间兼容：参数多的兼容参数少的
