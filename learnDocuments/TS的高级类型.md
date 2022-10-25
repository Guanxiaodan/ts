# TypeScript 的高级特性

## 交叉类型（取并集）

将多个类型合并成一个类型，新的类型将具有所有类型的特性，适合对象混入的场景

使用<font color=red>&</font>符号链接

```typescript
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
```

## 联合类型

声明的类型并不确定，可以为多个类型中的一个

如果一个变量被判断为联合类型，那么在类型未确定的时候，只能访问联合类型中的共有成员

```typescript
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
```

### 字面量联合类型

```typescript
let a1: "a" | "b" | "c";
let a2: 1 | 2 | 3;
```

### 可区分的联合类型

结合了联合类型和字面量类型的一种类型保护方法

一个类型如果是多个类型的联合类型，并且每个类型之间有一个公共的属性，那么久可以这个公共属性创建不同的类型保护区块

```typescript
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
```

但存在一个问题：如果给联合类型中新增一个，但在 area 函数中没有对新类型做处理。我们希望 area 对没有处理的内容作出错误提示，这时候有两种方式：

- 一个是添加返回值类型

```typescript
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
```

- 另一个是添加错误处理

```typescript
interface Circle {
  kind: "circle";
  r: number;
}
type Shape2 = Square | Rectangle | Circle;
function area3(s: Shape2) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    default:
      return ((e: never) => {
        throw new Error(e);
      })(s);
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
```

## 索引类型

### 索引类型的查询操作符

<font color=red>keyof T</font>

表示类型 T 所有公共属性的字面量的联合类型

```typescript
interface Obj {
  a: number;
  b: number;
}
let key: keyof Obj;
```

### 逐一访问操作符

<font color=red>T[k]</font>

意思是：对象 T 的属性 k 所代表的的类型

### T extends U

表示泛型变量可以通过继承某个类型或者属性

```typescript
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
console.log(getValues(obj6, ["e", "f"])); // 这里会出现TS错误提示，以为obj6中并没有这两个属性
```

索引类型可以实现对对象属性的查询，访问，再配合泛型约束，就可以建立对象，对象属性，对象属性值类型之间的约束关系

## 映射类型

可以从一个旧的类型生成一个新的类型
TS 内置了很多映射类型，可以到类库中查看。比如 Readonly,Pick

### 一些同态类型

```typescript
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
```

### 一些非同态类型

```typescript
interface Obj3 {
  a: string;
  b: number;
  c: boolean;
}
type RecordObj = Record<"x" | "y", Obj3>;
```

## 条件类型

是一种由条件表达式所决定的类型
<font color=red>T extends U ? X : Y</font>

官方预制了一些条件类型：Exclude<T,U>、NonNullable<T>、Extract<T,U>、ReturnType<T>
