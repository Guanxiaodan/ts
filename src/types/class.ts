class Dog {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  run() {}
}

// 无论是ES还是TS，类成员的属性都是实例属性，而不是原型属性，类成员的方法都是原型方法
// 类的私有成员（private）只能被类本身调用，不能被类的实例调用，也不能被子类调用
// 如果给类的构造函数前面加private，就说明这个类既不能被实例化，也不能被继承

console.log(Dog.prototype); // 打印类的原型，只有类成员的方法run,没有类成员的属性name
let dog = new Dog("wang");
console.log("gxd", "dog:", dog); // 类成员的属性name在这个dog实例上,而不在原型上

// TS中实例的属性必须有初始值，或者在构造函数中被初始化
class Dogs {
  constructor(name: string) {}
  name: string = "wang";
  run() {}
}
// 类的继承

// 定义子类
class Husky extends Dog {
  constructor(name: string, color: string) {
    super(name); // super代表父类的实例，父类构造函数中的参数，子类也要有
    this.color = color;
  }
  color: string;
}

// 类的成员修饰符（ts对es6的扩展）
// public 公有成员(默认类的属性和方法都是公有属性，公有属性可以被实例化或继承)
// private 私有成员  类的私有成员（private）只能被类本身调用，不能被类的实例调用，也不能被子类调用，如果给类的构造函数前面加private，就说明这个类既不能被实例化，也不能被继承
// protected 受保护成员 （只能在类或者子类中使用。不能在类的实例中访问），如果在构造函数前面加protected，说明这个类只能被继承，不能被实例化
// readonly 只读成员  只读属性和实例属性一样，必须被初始化
// static 静态成员 类的静态成员只能通过类名来调用， 不能通过实例来调用，可以被子类继承，即子类也可以调用静态成员

// 除了类的成员可以添加修饰符，构造函数的参数也可以添加修饰符，作用是将参数自动变为实例的属性，就不用再类中声明该属性了，使代码更简洁。比如：
class Husky2 extends Dog {
  constructor(name: string, public color: string) {
    super(name); // super代表父类的实例，父类构造函数中的参数，子类也要有
    this.color = color;
  }
  // color: string; // 因为在构造函数中添加了修饰符public，所以color就变成了实例的属性，就不用在Husky2中声明该属性了
}

// 抽象类 （只能被继承，不能被实例化）
// 抽象类的好处是可以抽离出事务的共性，有利于代码复用和扩展，还可以实现多态
abstract class Animal {
  eat() {
    console.log("Animal can eat");
  }
  abstract sleep(): void; // 不指定方法的具体实现，就构成了抽象方法，好处是明确知道子类可以有其他的实现，就没有必要在父类中实现了。
}

// let animal = new Animal()  // 会报错，无法给抽象类创建实例

class DOG2 extends Animal {
  constructor(name: string) {
    super();
    this.name = name;
  }
  name: string;
  run() {}
  sleep() {
    console.log("dog can sleep 10 hours");
  }
}

const dog2 = new DOG2("wangwang2");
dog2.eat();

// 多态
class Cat extends Animal {
  sleep(): void {
    console.log("cat love sleep");
  }
}

let cat = new Cat();

let animals: Animal[] = [dog2, cat];
animals.forEach((item) => {
  item.sleep();
});

// this类型（一种特殊的ts类型）
// 类的成员方法可以直接返回this, 这样可以很方便地实现链式调用;

class WorkFlow {
  step1() {
    return this;
  }
  step2() {
    return this;
  }
}
new WorkFlow().step1().step2().step2();
// 在继承的时候，this类型也可以表现出多态，因为this既可以是父类型，也可以是子类型,这样就实现了父类和子类方法的链式调用

class MyFlow extends WorkFlow {
  next() {
    return this;
  }
}

new MyFlow().next().step1().next().step2();

// 类和接口之间的关系
// 类类型接口
// 一个接口可以约束类成员有哪些属性，以及属性的类型

interface Human {
  name: string;
  eat(): void;
}

// 给类使用接口要用到关键字implements
// 注意：类实现接口的时候，要实现接口中声明的所有属性。类也可以再额外声明自己的属性
// 接口只能约束类的共有成员（其他带修饰器的，比如私有属性，构造函数 等等不受接口约束）
class Asian implements Human {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  eat() {}
  speak() {}
}
