// function myFunc() {
//     document.getElementById("test").style.color = 'green';
// }
// setTimeout(myFunc, 3000);
console.log('script2 begins!')
// document.getElementById("test").style.color = 'green';
var para = document.createElement("p");
var node = document.createTextNode("This is from script2.");
para.appendChild(node);

console.log('script2 evaluating!')

var element = document.getElementById("test2");
element.appendChild(para);

console.log('script2 ends here!')
