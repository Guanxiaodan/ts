// ES6导入
import { a, b, c } from "./a"; // 批量导入
import { P } from "./a"; // 导入接口
import { f as F } from "./a"; // 导入时起别名
import * as All from "./a"; // 导入模块中的所有成员，绑定在All上
import myFunction from "./a"; // 不加{},导入默认

console.log(a, b, c); // 1,2,3

let p: P = {
  x: 1,
  y: "g",
};

F(); // function f

console.log(All); // 除了接口P没有打印出来，剩下的都打印出来了，All.default就是用export default导出的内容

myFunction(); // 导入时不加{}就是 export default导出的内容
