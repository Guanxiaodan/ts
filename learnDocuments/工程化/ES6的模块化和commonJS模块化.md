# ES6 模块化和 CommonJS 模块化

## ES6 导入导出

- ES6 的导入导出没有等号
- 顶级导出：export default A
- 顶级导入：import A from 'xxx'
- 次级导出：export B
- 次级导入：import {B} from 'xxx'
- 可以同时使用顶级导出和多个次级导出
  - <font color=red>import \* as C from "xxx"</font> 导入模块中的所有成员，绑定在 C 对象上，其中顶级导出在 C.default 上

ES6 导出

```typescript
// /es6/b.ts
export const str = "from b";
```

ES6 导出+导入别的文件内容再导出

```typescript
// /es6/a.ts

// 单独导出
export let a = 1;

// 批量导出
let b = 2;
let c = 3;
export { b, c };

// 导出接口
export interface P {
  x: number;
  y: string;
}

// 导出函数
export function f() {
  console.log("function f");
}

// 导出时起别名
function g() {}
export { g as G };

// 默认导出(顶级导出)，无需函数名
export default function () {
  console.log("I am default");
}

// 引入外部模块并重新导出
export { str as hello } from "./b";
```

ES6 导入

```typescript
// /es6/c.ts

// ES6导入
import { a, b, c } from "./a"; // 批量导入
import { P } from "./a"; // 导入接口
import { f as F } from "./a"; // 导入时起别名
import myFunction from "./a"; // 不加{},导入默认,导入的时候随便起名
import * as All from "./a"; // 导入模块中的所有成员，绑定在All上

console.log(a, b, c); // 1,2,3

let p: P = {
  x: 1,
  y: "g",
};

F(); // function f

myFunction(); // 导入时不加{}就是 export default导出的内容

console.log(All); // 除了接口P没有打印出来，剩下的都打印出来了，All.default就是用export default导出的内容
```

## CommonJS 导入导出

node 是 commonJS 模块的一种实现

- commonJS 的导入导出需要等号
- 顶级导出：module.exports = A
- 顶级导入：let C1 = require('xxx')
- 次级导出：exports.B = 'b'
- 次级导入：let C2 = require('xxx')
- 顶级导出 module.exports 会覆盖次级导出 exports.
  - 可以理解为 CommonJS 内置了 const exports = module.exports
  - 当使用了 module.exports=A 的时候，module.exports 的引用就变了，但 exports 还指向原来的引用，所以这个时候 exports 就不等于 module.exports 了，这时候 exports 等于几都不管用了，相当于 module.exports 把 exports 覆盖了

Commonjs 顶级导出

```typescript
// ./node/a.node.ts

// Commonjs顶级导出
let c = {
  x: 1,
  y: 2,
};

module.exports = c;
```

Commonjs 次级导出

```typescript
// ./node/b.node.ts

// exports === module.exports
// 导出多个变量
exports.c = 3;
exports.d = 4;
```

Commonjs 导入

```typescript
// ./node/c.node.ts
// Commonjs导入
let c1 = require("./a.node");
let c2 = require("./b.node");
console.log(c1); // { x: 1, y: 2 }
console.log(c2); // { c: 3, d: 4 }
```

## tsconfig.json 的编译选项

```typescript
"target":"es5",
"module":"commonjs"
```

- target 表示我们要编译成的目标语言是什么版本，在 tsconfig.json 中默认是 es5,在 tsc 命令行中，默认是 es3
- module 表示要把代码编译成什么样的模块系统，在 tsconfig.json 中和 tsc 中，默认都是 commonjs

<font color=red>注意：如果在 tsc 中指定编译某个文件，则命令行会自动忽略 tsconfig.json 文件，需要在命令行中输入配置项，如下：</font>

```typescript
tsc ./src/project/es6/a.ts -t es3
```

<font color=red>如果在命令行中，target 指定为 es3，es5,则 module 会默认为 commonjs,如果 target 指定为 es6,则 module 会默认为 ES6</font>

## TS 解决用 commonJS 的方式引入 ES6 的顶级导出模块的兼容性问题

问题由来：

> 在"module":"commonjs"的编译模式下（即无论是 ES6,AMD,CMD,其导入导出的方式都便已成为 commonjs 的导入导出方式），
> ES6 被编译后顶级导出会默认带一个 default，编译后的导入也会自动带上一个 default，但是以 commonJS 的方式引入 ES6 的顶级导出的内容后，编译后不带 default,所以会产生兼容性问题，这个时候在 commonjs 模块的引用中给 ES6 那个加个 default 就行了

```typescript
// ../es6/a.ts
// 默认导出(顶级导出)，无需函数名
export default function () {
  console.log("I am default");
}
```

```typescript
// ./node/c.node.ts
let c3 = require("../es6/a");
c3(); // 这里会报错，找不到
// 因为ES6编译后的顶级导出模块会成为default属性的值，所以这里在使用的时候需要加个.default
c3.default(); // 这样就不报错了，但这样额外加一个default属于反常规操作，而且容易发生错误，所以TS提供了别的解决方案（兼容性语法）
console.log(c3);
```

### TS 的兼容语法，解决用 commonJS 语法导入 ES6 顶级导出模块要加 default 的问题

导出：

```typescript
// ../es6/d.ts的导出方式为：
// 这里的export相当于commonjs中的顶级导出module.exports=
// 所以这种写法下，就不能有别的导出内容了
export = function () {
  console.log("I am default");
};
```

导入（两种方式，第二种方式需要配置 jsconfig.json 中的 esModuleInterop）：

```typescript
// 方式一：
import c4 = require("../es6/d");
c4();
// 方式二：
import c5 from "../es6/d"; // 在jsconfig.json文件中如果设置 "esModuleInterop":true,则这种导入方式可用，否则只能使用import c4 = require("../es6/d");的导入方式
c5();
```
