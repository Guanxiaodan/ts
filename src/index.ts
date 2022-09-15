let myHello: string = "第一个ts";
document.querySelectorAll(".app")[0].innerHTML = myHello;

function add8(...rest: number[]): number;
function add8(...rest: string[]): string;
function add8(...rest: any[]): any {
  let first = rest[0];
  if (typeof first === "string") {
    return rest.join("");
  }
  if (typeof first === "number") {
    return rest.reduce((pre, cur) => pre + cur);
  }
}

console.log(add8(1, 2, 3));
console.log(add8("hello", "world"));
