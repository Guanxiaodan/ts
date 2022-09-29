// Typescript的泛型
// 我们希望给函数传入什么类型，最后就返回什么类型，但是这个类型可能是string，可能是number。学习泛型之前的解决方法是函数重载，或者联合类型，但这些都比较繁琐或者不能完全达到我们的需求，所以这里就可以用泛型来完美解决
// 普通函数实现不完美：
function log2(value: any): any {
  console.log(value);
  return value;
}

// 使用泛型进行改造(泛型函数) 这样即保障了类型的灵活性，又保障了输入类型和输出类型一致
function log1<T>(value: T): T {
  console.log(value);
  return value;
}

// 在使用的时候，可以指定输入的类型
log1<string[]>(["a", "b"]);

// 也可以利用TS类型推断的特性，直接写实参
log1(["a", "b"]);

// 泛型定义函数类型
type Log = <T>(value: T) => T;

// 使用
let myLog: Log = log1;

// 泛型接口
// 与类型别名的定义方式等价
interface Log3 {
  <T>(value: T): T;
}
// 类型别名的定义方法
type Log4 = <T>(value: T) => T;

// 用泛型约束接口的其他成员
// 这样接口的所有成员都可以受到泛型的约束了
interface Log5<T> {
  (value: T): T;
}
// 在实现的时候必须指定一个类型，比如这个<string>
let myLog2: Log5<string> = log2;
myLog2("gdd");
// 也可以指定默认类型，这样在实现的时候不指定就用默认的
interface Log6<T = number> {
  (value: T): T;
}
let myLog3: Log6 = log2;
myLog3(123);
