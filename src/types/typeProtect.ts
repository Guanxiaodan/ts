enum Type {
  Strong,
  Week,
}
class Java {
  helloJava() {
    console.log("hello java");
  }
  java: any;
}
class JavaScript {
  helloJavaScript() {
    console.log("hello JavaScript");
  }
  javascript: any;
}

function getLanguage(type: Type) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();
  if ((lang as Java).helloJava) {
    (lang as Java).helloJava();
  } else {
    (lang as JavaScript).helloJavaScript; // 函数每处需要断言下，写法不优美
  }
  return lang;
}

// 有四种方法创建类型保护区块来避免这种频繁的类型断言
// 方法一：instanceof  判断前者是否为后者的实例
function getLanguage1(type: Type) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();
  if (lang instanceof Java) {
    lang.helloJava();
  } else {
    lang.helloJavaScript;
  }
  return lang;
}

// 方法二：使用in关键字
// in 关键字可以判断一个属性是否属于某个对象
function getLanguage2(type: Type) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();
  if ("java" in lang) {
    lang.helloJava();
  } else {
    lang.helloJavaScript;
  }
  return lang;
}

// 方法三：typeof
function getLanguage3(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();
  if (typeof x === "string") {
    x.length;
  } else {
    x.toFixed(2);
  }
  return lang;
}

// 方法四：创建类型保护函数来判断对象类型
function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined;
}
function getLanguage4(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();
  if (isJava(lang)) {
    lang.helloJava();
  } else {
    lang.helloJavaScript;
  }
  return lang;
}
