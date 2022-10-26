# Typescript 的枚举类型

一组具有名字的常量集合

## 数字枚举

> <font color=red>有反向映射</font>,既可以用 value 索引，也可以用 key 索引,原理是反向映射 (const p = {}; p[p['m']=3]='m')

- <font color=red>没有初始值</font>，从上往下，从 0 开始递增

```typescript
enum Role {
  Reporter,
  Developer,
  Maintainer,
  Owner,
  Guest,
}
console.log(Role.Reporter); // 0
```

- <font color=red>有初始值</font>，从上到下，从初始值开始递增

```typescript
enum Role2 {
  Reporter = 1,
  Developer,
  Maintainer,
  Owner,
  Guest,
}
console.log(Role2); // 既可以用value索引，也可以用key索引,原理是反向映射 (const p = {}; p[p['m']=3]='m')
// {
//     "1": "Reporter",
//     "2": "Developer",
//     "3": "Maintainer",
//     "4": "Owner",
//     "5": "Guest",
//     "Reporter": 1,
//     "Developer": 2,
//     "Maintainer": 3,
//     "Owner": 4,
//     "Guest": 5
// }
```

## 字符串枚举

<font color=red>没有反向映射</font>

```typescript
enum Message {
  Success = "成功",
  Fail = "失败",
}
console.log(Message); // 没有反向映射
// {
//     "Success": "成功",
//     "Fail": "失败"
// }
```

## 异构枚举 （字符串和数字混用，不建议使用，容易混淆）

## 枚举成员

<font color=red>枚举成员只读，定义后不允许修改</font>

### 枚举成员分类

- 常量枚举 const
- 计算枚举 computed

```typescript
enum Char {
  // const
  a,
  b = Char.a,
  c = 1 + 3,
  //   computed
  d = Math.random(),
  e = "123".length,
}

console.log(Char);
// {
//     "0": "b",
//     "3": "e",
//     "4": "c",
//     "a": 0,
//     "b": 0,
//     "c": 4,
//     "d": 0.921366180114076,
//     "0.921366180114076": "d",
//     "e": 3
// }
```

#### 常量枚举 （const）

- 常量枚举分三种情况
  - 没有初始值
  - 对已有枚举成员的引用
  - 常量表达式
- 常量枚举成员会在编译时候计算出结果，然后以常量的形式出现在运行时环境
- <font color=red>用 const 声明的枚举就是常量枚举</font>
- 特点：<font color=red>会在编译阶段被移除，即没有编译后的代码</font>,可以使用下面的这个 enum Month 在[官网](https://www.typescriptlang.org/zh/play?#code/FAGwpgLgBAFmIgPYC4oGcICcCWA7A5lALxQBEgNN6AAcoFRyEapA3EA)试试
- 使用场景：当不需要使用一个对象，而需要使用对象的值得时候，这样会减少在编译环境的代码，如下：

```typescript
const enum Month {
  Jen,
  Feb,
  Mar,
}
let month = [Month.Jen, Month.Feb, Month.Mar];
```

会被编译成：

```javascript
"use strict";
let month = [0 /* Month.Jen */, 1 /* Month.Feb */, 2 /* Month.Mar */];
```

#### 需要被计算的枚举成员 (computed)

- 需要被计算的枚举成员
  - 是一些非常量的表达式
  - 不会在编译阶段进行计算，而是会被保留到程序的执行阶段再进行计算

## 枚举类型

> 枚举和枚举成员，都可以作为一种单独的类型存在

- 有三种情况
  - 1.枚举成员没有任何初始值（其实也相当于数字枚举）
  - 2.所有成员都是数字枚举
  - 3.所有成员都是字符串枚举
- 前面两种情况，可以把数值赋值给变量，取值也可以超出枚举成员的定义
- 两种不同类型的枚举不能进行比较

枚举成员没有任何初始值（其实也相当于数字枚举）

```typescript
enum E {
  a,
  b,
}
let e: E = 3;
let e1: E.a;
let e2: E.b;
let e3: E.a;
// 两种不同类型的枚举不能进行比较，如下：
// e1===e2 会报错：“此条件将始终返回 "false"，因为类型 "E.a" 和 "E.b" 没有重叠”
// 因为e1和e2属于两种不同的类型
```

所有成员都是数字枚举

```typescript
enum F {
  a = 0,
  b = 1,
}
let f: F = 4;
// 前面两种情况，可以把数值赋值给变量，取值也可以超出枚举成员的定义
```

所有成员都是字符串枚举

```typescript
// 变量只能取枚举成员的值
enum G {
  a = "apple",
  b = "banana",
}
let g1: G = G.b; // 取值为G.a,G.b都行
let g2: G.a = G.a; //  取值只能是G.a
```
