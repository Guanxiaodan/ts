# Typescript 接口

约束对象，函数，类的结构和类型

## 对象类型的接口

```typescript
interface List {
  id: number;
  name: string;
}

interface Result {
  data: List[];
}

function render(result: Result) {
  result.data.forEach((item) => {
    console.log(item.id, item.name);
  });
}

let res = {
  data: [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
  ],
};

render(res);
```

上面这种写法是最标准的，但往往后端给传回来的数据中还有其他的字段，不在我们接口范围内，这时候如何处理？

- 处理方式一：<font color=red>把对象拿出来定义</font>，不要把对象直接传给函数

```typescript
let res2 = {
  data: [
    { id: 1, name: "A", age: 22 },
    { id: 2, name: "B" },
  ],
};
render(res2);
// 如果像下面这样直接传入不符合接口定义的对象会报错：
// render({
//     data: [
//       { id: 1, name: "A", age: 22 },
//       { id: 2, name: "B" },
//     ],
//   });
```

- 处理方式二：<font color=red>类型断言</font>(这样编译器就会绕过类型检查)

```typescript
render({
  data: [
    { id: 1, name: "A", age: 22 },
    { id: 2, name: "B" },
  ],
} as Result);

// 类型断言的另一种写法 (这种写法会和React预发产生冲突，不推荐)
render(<Result>{
  data: [
    { id: 1, name: "A", age: 22 },
    { id: 2, name: "B" },
  ],
});
```

- 处理方式三：使用<font color=red>字符串索引签名</font>

```typescript
// 对象类型的接口
interface List2 {
  id: number;
  name: string;
  [x: string]: any; // 用任意的字符串去索引list,可以得到任意的结果，这样list就可以支持多个属性
}

interface Result2 {
  data: List2[];
}

function render2(result: Result2) {
  result.data.forEach((item) => {
    console.log(item.id, item.name);
  });
}

render2({
  data: [
    { id: 1, name: "A", age: 22 },
    { id: 2, name: "B" },
  ],
});
```

### 接口成员属性

- 只读属性 readonly
- 可选属性 ？
- 可索引类型接口
  - 数字索引
  - 字符串索引接口
  - 混合使用

```typescript
interface List3 {
  readonly id: number; // 只读属性 readonly
  name: string;
  age?: number; // 可选属性 ？
}

interface Result3 {
  data: List3[];
}

function render3(result: Result3) {
  result.data.forEach((item) => {
    console.log(item.id, item.name);
    if (item.age) {
      console.log(item.age);
    }
    // item.id++ // 只读属性不允许修改
  });
}

let res3 = {
  data: [
    { id: 1, name: "A", age: 32 },
    { id: 2, name: "B" },
  ],
};

render3(res);
```

#### 可索引类型接口

- 数字索引
  - 用任意的数字去索引 StringArray,都会得到 string。相当于声明了一个字符串类型的数组

```typescript
interface StringArray {
  [index: number]: string; // 用任意的数字去索引StringArray,都会得到string。相当于声明了一个字符串类型的数组
}
let chars: StringArray = ["a", "b", "c"];
```

- 字符串索引接口
  - 含义是用任意的字符串去索引 Names,得到的结果都是 string

```typescript
interface Names {
  [x: string]: string; // 含义是用任意的字符串去索引Names,得到的结果都是string
}
let myInfo: Names = {
  name: "gdd",
  school: "sh",
};
```

- 混合使用
  - 第一行的值的类型是第二行值的类型的父类

```typescript
interface Persons {
  [x: string]: string;
  [y: number]: string; // 下面的类型需要为上面类型的子类
}
```

## 函数类型的接口

### 用接口定义一个函数类型

```typescript
// 不需要定义函数名称，只需要定义参数类型和返回值类型
interface Add {
  (x: number, y: number): number;
}
```

```typescript
// 用变量定义一个函数类型
let add2: (x: number, y: number) => number;
```

上面两种写法是等价的（接口定义函数类型和变量定义函数类型）

#### 更简洁的定义方式：类型别名 type

- 就是为这个函数类型起一个名字

```typescript
// 就是为这个函数类型起一个名字，这个函数类型叫Add2
type Add2 = (x: number, y: number) => number;
// add3就是函数的具体实现
let add3: Add2 = (a, b) => a + b;
```

### 混合接口

- 可以用函数进行封装方便创造多个实例

```typescript
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
```

## 接口的继承

### 接口继承接口

接口可以像类似的相互继承，而且一个接口可以继承多个接口

```typescript
interface Human {
  name: string;
  eat(): void;
}

interface Man extends Human {
  run(): void;
}

interface Child {
  cry(): void;
}

interface Boy extends Man, Child {}
let boy: Boy = {
  name: "xiao ming",
  run() {},
  eat() {},
  cry() {},
};
```

### 接口继承类

相当于接口把类的成员都抽象了出来，即只有类的成员结构，而没有具体的实现。这里不仅把类的公共成员抽离了出来，其他的私有成员，受保护成员也被抽离了出来

```typescript
class Auto {
  state = 1;
}
// 接口继承类
interface AutoInterface extends Auto {}

// 类实现接口
class C implements AutoInterface {
  state = 1;
}
```

如果一个接口 C 继承了类 A 的非共有属性，那么只能由这个类的子类 a 去实现接口 C。

```typescript
class Auto {
  state = 1;
  private state2 = 0;
}
// 接口继承类
interface AutoInterface extends Auto {}

// 类实现接口
// 这样不行，因为C不是Auto的子类，且AutoInterface抽离来了Auto的非共有属性，所以不能实现接口AutoInterface
class C implements AutoInterface {
  state = 1;
  private state2 = 0;
}

// Bus类继承Auto类，并实现AutoInterface接口
class Bus extends Auto implements AutoInterface {}
```
