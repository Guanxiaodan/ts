# Typescript 的类型检查机制

类型检查机制：Typescript 编译器在做类型检查时所秉承的一些原则以及表现出的一些行为

## 类型推断

类型推断：不需要指定变量的类型（函数的返回值类型），Typescript 则可以根据某些规则自动的为其推断出一个类型

### 基础类型推断

比如在初始化一个变量的时候

如果不指定变量类型，ts 会将其推断为 any 类型

```typescript
// a的类型为any
let a;
```

如果给变量赋值了，ts 会根据所赋的值的类型推断出变量的类型

```typescript
// b的类型为number
let b = 1;
```

### 最佳通用类型推断

当需要从多个类型中推断出一个类型的时候，TS 会尽可能推断出一个兼容当前所有类型的通用类型

### 上下文类型推断

通常发生在事件处理中;

下面这个例子中，这时候 event 就被推断为了 KeyboardEvent 类型。并且能推断出来 event 的属性有哪些:

```typescript
window.onkeydown = (event) => {
  console.log(event.bubbles);
};
```

## 类型断言

有时候 TS 的类型推断不符合预期，而且开发者有自信比 TS 更了解代码，这时候就可以使用类型断言来覆盖 ts 的类型推断

```typescript
let foo = {};
foo.bar = 1; // 这个时候会报错，因为foo中没有bar属性
```

可以通过类型断言来解决:

```typescript
interface Foo {
  bar: number;
}
let foo2 = {} as Foo;
foo2.bar = 2;
```

但是类型断言使用需要注意，避免带来隐患

## 类型兼容性

<font color=red>结构之间兼容：成员少的兼容成员多的</font>
<br/>
<font color=red>函数之间兼容：参数多的兼容参数少的</font>

当一个类型 Y 可以被赋值给另一个类型 X 时，我们就可以说类型 X 兼容类型 Y

X 兼容 Y:X(目标类型)=Y(源类型)

### 接口的兼容

数量少的可以兼容数量多的，我要的你有就行

```typescript
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
```

### 函数的兼容性

通常会发生在两个函数相互赋值的情况下

#### 参数个数的要求

参数多的可以兼容参数少的

```typescript
// 这里的 Handler 就是目标类型，要传入的参数就是源类型
type Handler = (a: number, b: number) => void;
function hof(handler: Handler) {
  return handler;
}
let handler1 = (a: number) => {};
hof(handler1);
let handler2 = (a: number, b: number, c: number) => {};
// hof(handler2); 参数多的不能赋值给参数少的
```

- 参数多的函数可以兼容参数少的函数，即目标函数的参数个数多于源函数的参数个数
- 返回值少的函数可以兼容返回值多的函数

#### 参数类型的要求

参数类型需匹配才能兼容

```typescript
let handler4 = (a: string) => {};
// hof(handler4); // 参数类型不兼容
```

对于对象参数的类型判断

```typescript
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
```

#### 可选参数和剩余参数

- 固定参数可以兼容可选参数和剩余参数
- 剩余参数可以兼容固定参数和可选参数
- 可选参数不兼容固定参数和剩余参数 （可以设置 strictFunctionTypes:false，来让其兼容）

```typescript
let m = (p1: number, p2: number) => {};
let n = (p1?: number, p2?: number) => {};
let v = (...args: number[]) => {};
m = n;
m = v;
v = m;
v = n;
n = m;
n = v;
```

#### 函数的返回值类型的兼容

目标函数的返回值类型必须与原函数的返回值类型相同，或者为其子类型

```typescript
let f1 = () => ({ name: "Alice" });
let f2 = () => ({ name: "Alice", location: "Beijing" });
f1 = f2;
// f2=f1 // 不行，反正到函数这里就是少的兼容多的
```

#### 函数重载

重载列表中目标函数的参数要多于原函数的参数

```typescript
function overload1(a: number, b: number): number; // 目标函数
function overload1(a: string, b: string): string; // 目标函数
function overload1(a: any, b: any): any; // 原函数
```

### 枚举类型的兼容性

- 枚举类型和数值类型是相互兼容的
- 枚举类型之间是完全不兼容的

```typescript
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
```

### 类的兼容性

- 与接口的兼容性相似
- 构造函数和静态成员不进行比较，但私有成员不相互兼容
- 如果两个类具有相同的实例成员，那么这两个实例就可以相互兼容

### 泛型的兼容性

```typescript
interface Empty<T> {}
let obj1: Empty<number> = {};
let obj3: Empty<string> = {};
obj1 = obj3;
```

只有类型参数 T 被接口成员使用的时候，才会影响泛型的兼容性

```typescript
interface Empty2<T> {
  val: T;
}
let obj4: Empty2<number> = { val: 2 };
let obj5: Empty2<string> = { val: "a" };
// obj4 = obj5; // 不兼容
```

### 泛型函数的兼容性

```typescript
let logs1 = <T>(x: T): T => {
  console.log("x");
  return x;
};
let logs2 = <U>(y: U): U => {
  console.log("y");
  return y;
};
logs1 = logs2;
```

## 类型保护

TS 能够在特定的区块中(类型保护区块中)保证变量属于某种确定的类型，可以在这个区块中放心地引用此类型的属性，或者调用此类型的方法

```typescript
enum Type {
  Strong,
  Week,
}
class Java {
  helloJava() {
    console.log("hello java");
  }
  java: any;
}
class JavaScript {
  helloJavaScript() {
    console.log("hello JavaScript");
  }
  javascript: any;
}

function getLanguage(type: Type) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();
  if ((lang as Java).helloJava) {
    (lang as Java).helloJava();
  } else {
    (lang as JavaScript).helloJavaScript; // 函数每处需要断言下，写法不优美
  }
  return lang;
}
```

有四种方法创建类型保护区块来避免这种频繁的类型断言

### 方法一：instanceof 判断前者是否为后者的实例

```typescript
function getLanguage1(type: Type) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();
  if (lang instanceof Java) {
    lang.helloJava();
  } else {
    lang.helloJavaScript;
  }
  return lang;
}
```

### 方法二：使用 in 关键字

in 关键字可以判断一个属性是否属于某个对象

```typescript
function getLanguage2(type: Type) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();
  if ("java" in lang) {
    lang.helloJava();
  } else {
    lang.helloJavaScript;
  }
  return lang;
}
```

### 方法三：typeof

```typescript
function getLanguage3(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();
  if (typeof x === "string") {
    x.length;
  } else {
    x.toFixed(2);
  }
  return lang;
}
```

### 方法四：创建类型保护函数来判断对象类型

```typescript
function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined;
}
function getLanguage4(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();
  if (isJava(lang)) {
    lang.helloJava();
  } else {
    lang.helloJavaScript;
  }
  return lang;
}
```
