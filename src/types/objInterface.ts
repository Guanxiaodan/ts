// 对象类型的接口
interface List {
  id: number;
  name: string;
}

interface Result {
  data: List[];
}

function render(result: Result) {
  result.data.forEach((item) => {
    console.log(item.id, item.name);
  });
}

let res = {
  data: [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
  ],
};

render(res);
// 上面这种写法是最标准的，但往往后端给传回来的数据中还有其他的字段，不在我们接口范围内，这时候如何处理？

// 处理方式一：把对象拿出来定义，不要把对象直接传给函数
let res2 = {
  data: [
    { id: 1, name: "A", age: 22 },
    { id: 2, name: "B" },
  ],
};
render(res2);
// 如果像下面这样直接传入不符合接口定义的对象会报错：
// render({
//     data: [
//       { id: 1, name: "A", age: 22 },
//       { id: 2, name: "B" },
//     ],
//   });

// 处理方式二：类型断言
// 这样编译器就会绕过类型检查
render({
  data: [
    { id: 1, name: "A", age: 22 },
    { id: 2, name: "B" },
  ],
} as Result);

// 类型断言的另一种写法 (这种写法会和React预发产生冲突，不推荐)
render(<Result>{
  data: [
    { id: 1, name: "A", age: 22 },
    { id: 2, name: "B" },
  ],
});

// 处理方式三：使用字符串索引签名
// 对象类型的接口
interface List2 {
  id: number;
  name: string;
  [x: string]: any; // 用任意的字符串去索引list,可以得到任意的结果，这样list就可以支持多个属性
}

interface Result2 {
  data: List2[];
}

function render2(result: Result2) {
  result.data.forEach((item) => {
    console.log(item.id, item.name);
  });
}

render2({
  data: [
    { id: 1, name: "A", age: 22 },
    { id: 2, name: "B" },
  ],
});

// 接口成员属性
interface List3 {
  readonly id: number; // 只读属性 readonly
  name: string;
  age?: number; // 可选属性 ？
}

interface Result3 {
  data: List3[];
}

function render3(result: Result3) {
  result.data.forEach((item) => {
    console.log(item.id, item.name);
    if (item.age) {
      console.log(item.age);
    }
    // item.id++ // 只读属性不允许修改
  });
}

let res3 = {
  data: [
    { id: 1, name: "A", age: 32 },
    { id: 2, name: "B" },
  ],
};

render3(res);

// 可索引类型接口
// 数字索引
interface StringArray {
  [index: number]: string; // 用任意的数字去索引StringArray,都会得到string。相当于声明了一个字符串类型的数组
}
let chars: StringArray = ["a", "b", "c"];

// 字符串索引接口
interface Names {
  [x: string]: string; // 含义是用任意的字符串去索引Names,得到的结果都是string
}
let myInfo: Names = {
  name: "gdd",
  school: "sh",
};

// 混合使用
interface Persons {
  [x: string]: string;
  [y: number]: string; // 下面的类型需要为上面类型的子类
}
