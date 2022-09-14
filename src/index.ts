let myHello: string = "第一个ts";
document.querySelectorAll(".app")[0].innerHTML = myHello;
enum Char2 {
  a,
  b = Char2.a,
  c = 1 + 3,
  d = Math.random(),
  e = "123".length,
}
console.log("gxd", "Char2:", Char2);
