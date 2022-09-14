// 数字枚举：没有初始值，从上往下，从0开始递增
enum Role {
  Reporter,
  Developer,
  Maintainer,
  Owner,
  Guest,
}
console.log(Role.Reporter); // 0

// 数字枚举：从山上到下，从1开始递增
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

// 字符串枚举
enum Message {
  Success = "成功",
  Fail = "失败",
}
console.log(Message); // 没有反向映射
// {
//     "Success": "成功",
//     "Fail": "失败"
// }

// 枚举成员
// 枚举成员只读，不允许修改
// 枚举成员分类(const ,computed)
enum Char {
  a,
  b = Char.a,
  c = 1 + 3,
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

// const 常量枚举
const enum Month {
  Jen,
  Feb,
  Mar,
}
let month = [Month.Jen, Month.Feb, Month.Mar];
// 用const声明的枚举就是常量枚举;

// 枚举类型
// 枚举和枚举成员，都可以作为一种单独的类型存在

// 枚举成员没有任何初始值
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

// 所有成员都是数字枚举
enum F {
  a = 0,
  b = 1,
}
let f: F = 4;
// 前面两种情况，可以把数值赋值给变量，取值也可以超出枚举成员的定义

// 所有成员都是字符串枚举
// 变量只能取枚举成员的值
enum G {
  a = "apple",
  b = "banana",
}
let g1: G = G.b; // 取值为G.a,G.b都行
let g2: G.a = G.a; //  取值只能是G.a
