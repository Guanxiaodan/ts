"use strict";
exports.__esModule = true;
// ES6导入
var a_1 = require("./a"); // 批量导入
var a_2 = require("./a"); // 导入时起别名
var All = require("./a"); // 导入模块中的所有成员，绑定在All上
var a_3 = require("./a"); // 不加{},导入默认
console.log(a_1.a, a_1.b, a_1.c); // 1,2,3
var p = {
    x: 1,
    y: "g"
};
(0, a_2.f)(); // function f
console.log(All); // 除了接口P没有打印出来，剩下的都打印出来了，All.default就是用export default导出的内容
(0, a_3["default"])(); // 导入时不加{}就是 export default导出的内容
