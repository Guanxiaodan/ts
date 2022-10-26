let c1 = require("./a.node");
let c2 = require("./b.node");
console.log(c1); // { x: 1, y: 2 }
console.log(c2); // { c: 3, d: 4 }

// 用commonJS的方式引入ES6的顶级导出模块
let c3 = require("../es6/a");
// c3(); // 这里会报错，找不到
// 因为ES6编译后的顶级导出模块会成为default属性的值，所以这里在使用的时候需要加个.default
c3.default(); // 这样就不报错了，但这样额外加一个default属于反常规操作，而且容易发生错误，所以TS提供了别的解决方案（兼容性语法）
console.log("gxd", " c3:", c3);
// TS的兼容语法，解决用commonJS语法导入ES6顶级导出模块要加default的问题
// ../es6/d的导出方式为：
// export = function () {
//     console.log("I am default");
//   };
import c4 = require("../es6/d");
c4();
import c5 from "../es6/d"; // 在jsconfig.json文件中如果设置 "esModuleInterop":true,则这种导入方式可用，否则只能使用import c4 = require("../es6/d");的导入方式
c5();

// 能使用ES6的方式引入吗？完全没问题
import { a, b, c } from "../es6/a";
console.log("gxd", "a,b,c:", a, b, c); // 1,2,3没问题

import myFunction from "../es6/a"; // 不加{},导入默认
myFunction();
