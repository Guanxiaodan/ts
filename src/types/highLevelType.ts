// 交叉类型
interface DogInterface {
  run(): void;
}
interface CatInterface {
  jump(): void;
}

let pet: DogInterface & CatInterface = {
  run() {},
  jump() {},
};

// 联合类型
class Dog2 implements DogInterface {
  run() {}
  eat() {}
}
class Cat2 implements CatInterface {
  jump() {}
  eat() {}
}

enum Master {
  Boy,
  Girl,
}
function getPet(master: Master) {
  let pet = master === Master.Boy ? new Dog2() : new Cat2();
  pet.eat();
  // pet.run() // 联合类型只能访问类型中的共有方法
  return pet;
}

// 字面量联合类型
let a1: "a" | "b" | "c";
let a2: 1 | 2 | 3;

// 可区分的联合类型
interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Square | Rectangle;
function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
  }
}

// 但存在一个问题：如果给联合类型中新增一个，但在area函数中没有对新类型做处理。我们希望area对没有处理的内容作出错误提示，这时候有两种方式：
// 一个是添加返回值类型
interface Circle {
  kind: "circle";
  r: number;
}
type Shape2 = Square | Rectangle | Circle;
function area2(s: Shape2): number {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
  }
}
// 另一个是添加错误处理
function area3(s: Shape2) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    // default:
    //   return ((e: never) => {
    //     throw new Error(e);
    //   })(s); // 这里由于走到了never,说明上面有遗漏分支，所以会报错，需要补全分支
  }
}
// ((e: never) => {
//   throw new Error(e);
// })(s); 的作用是检查s是否为never类型，如果s是never类型，说明之前的分支都被覆盖了，那么这个分支永远不会走到，如果s不是never类型，说明前面的分支情况有遗漏，需要补上相应分支

function area4(s: Shape2) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.r ** 2;
    default:
      return ((e: never) => {
        throw new Error(e);
      })(s);
  }
}

// 索引类型
interface Obj {
  a: number;
  b: number;
}
let key: keyof Obj;

// 逐一访问操作符
let value: Obj["a"];

let obj6 = {
  a: 1,
  b: 2,
  c: 3,
};
function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map((key) => obj[key]);
}
console.log(getValues(obj6, ["a", "b"]));
// console.log(getValues(obj6, ["e", "f"])); // 这里会出现TS错误提示，以为obj6中并没有这两个属性
// 索引类型可以实现对对象属性的查询，访问，再配合泛型约束，就可以建立对象，对象属性，对象属性值类型之间的约束关系

// 映射类型

interface Obj3 {
  a: string;
  b: number;
  c: boolean;
}

// 使用TS内置的泛型接口ReadOnly;将所有类型变成只读
type ReadonlyObj = Readonly<Obj3>;

// 把接口所有属性变成可选的
type PartialObj = Partial<Obj3>;

// 抽取子集
type PickObj = Pick<Obj3, "a" | "b">;
// 上面三个映射类型叫做同态类型，不会创造出Obj3属性之外的
// 下面的是非同态类型
type RecordObj = Record<"x" | "y", Obj3>;

// 条件类型
// 条件类型的嵌套;
// 会依次判断T的类型，然后返回不同的字符串
type TypeName<T> = T extends string ? "string" : T extends number ? "number" : T extends boolean ? "boolean" : T extends undefined ? "undefined" : T extends Function ? "function" : "object";

type T1 = TypeName<string>;
type T2 = TypeName<string[]>;

// 分布式条件类型
// (A|B) extends U ? X : Y
// 相当于 ( A extends U ? X : Y )| (B extends U ? X : Y)

type T3 = TypeName<string | string[]>;
// 可以利用这个特性实现类型过滤
// 实际上官方已经时间了这个类型：Exclude<T,U>
type Diff<T, U> = T extends U ? never : T;
type T4 = Diff<"a" | "b" | "c", "a" | "e">;
// 上面会被拆解为
// Diff<'a','a'|'e'>|Diff<'b','a'|'e'>|Diff<'c','a'|'e'>
// never|"b"|"c"
// 所以最后结果为"b"|"c"

// 实际上官方已经时间了这个类型：NonNullable<T>
type NotNull<T> = Diff<T, undefined | null>;
type T5 = NotNull<string | number | undefined | null>;

type T6 = Extract<"a" | "b" | "c", "a" | "e">;
type T7 = Exclude<"a" | "b" | "c", "a" | "e">;

// ReturnType<T>可以获取函数返回值的类型
type T8 = ReturnType<() => string>;
