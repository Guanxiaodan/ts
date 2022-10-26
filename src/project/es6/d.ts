// TS的兼容语法，在ES6中使用顶级导出，在common中引用
// 这里的export相当于commonjs中的顶级导出module.exports=
// 所以这种写发下，就不能有别的导出内容了
export = function () {
  console.log("I am default");
};
