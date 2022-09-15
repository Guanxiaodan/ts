// 剩余参数
function add7(x: number, ...rest: number[]) {
  return x + rest.reduce((pre, cur) => pre + cur);
}
console.log(add7(1, 2, 3, 4));

// 函数重载
// 含义：两个函数如果名称相同，但是参数个数或参数类型不同，就实现了函数重载
// 好处：不需要为了功能相似的函数，选用不同的函数名称，从而增强函数可读性
// TS的函数从在需要定义一系列名称相同的函数声明
// 比如要实现这样一个功能：如果参数是数字，就返回所有数字的和，如果参数是字符串，就返回字符串的拼接
// 前两个add9是重载列表
// TS编译器在处理重载的时候，会查看重载列表，并且会从上往下尝试定义，如果匹配，就不往下继续找匹配的列表项了，所以建议把最容易匹配的函数定义写在最前面
function add9(...rest: number[]): number;
function add9(...rest: string[]): string;
function add9(...rest: any[]): any {
  let first = rest[0];
  if (typeof first === "string") {
    return rest.join("");
  }
  if (typeof first === "number") {
    return rest.reduce((pre, cur) => pre + cur);
  }
}

console.log(add9(1, 2, 3));
console.log(add9("hello", "world"));
