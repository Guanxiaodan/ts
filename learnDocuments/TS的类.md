# Typescript 的类

```typescript
class Dog {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  run() {}
}
```

TS 中的类不仅包含了 ES6 中的 class，还增加了一些新的特性

无论是 ES 还是 TS，<font color=red>类的属性成员都是实例属性，而不是原型属性，类的方法成员都是原型方法</font>

```typescript
console.log(Dog.prototype); // 打印类的原型，只有类成员的方法run,没有类成员的属性name
let dog = new Dog("wang");
console.log("gxd", "dog:", dog); // 类成员的属性name在这个dog实例上,而不在原型上
```

打印类的原型，只有类成员的方法 run,没有类成员的属性 name

<div align=center><img src="./imgs/classPropoty.jpg" width="400" ></div>

类成员的属性 name 在这个 dog 实例上,而不在原型上

<div align=center><img src="./imgs/classIn.jpg" width="400" ></div>

<font color=red> TS 中实例的属性必须有初始值，或者在构造函数中被初始化</font>

```typescript
class Dogs {
  constructor(name: string) {}
  name: string = "wang";
  run() {}
}
```

## TS 类的继承

<font color=red>super 代表父类的实例，父类构造函数中的参数，子类也要有</font>

```typescript
class Dog {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  run() {}
}

// 定义子类
class Husky extends Dog {
  constructor(name: string, color: string) {
    super(name); // super代表父类的实例，父类构造函数中的参数，子类也要有
    this.color = color;
  }
  color: string;
}
```

## TS 类的修饰符

- public 公有成员
  - (默认类的属性和方法都是公有属性，公有属性可以被实例化或继承)
- private 私有成员
  - 类的私有成员（private）只能被类本身调用，不能被类的实例调用，也不能被子类调用，如果给类的构造函数前面加 private，就说明这个类既不能被实例化，也不能被继承
- protected 受保护成员
  - 只能在类或者子类中使用。不能在类的实例中访问，如果在构造函数前面加 protected，说明这个类只能被继承，不能被实例化
- readonly 只读成员
  - 只读属性和实例属性一样，必须被初始化
- static 静态成员
  - 类的静态成员只能通过类名来调用， 不能通过实例来调用，可以被子类继承，即子类也可以调用静态成员

> 除了类的成员可以添加修饰符，构造函数的参数也可以添加修饰符，作用是将参数自动变为实例的属性，就不用再类中声明该属性了，使代码更简洁。比如：

```typescript
class Husky2 extends Dog {
  constructor(name: string, public color: string) {
    super(name); // super代表父类的实例，父类构造函数中的参数，子类也要有
    this.color = color;
  }
  // color: string; // 因为在构造函数中添加了修饰符public，所以color就变成了实例的属性，就不用在Husky2中声明该属性了
}
```

## 抽象类

## 多态
