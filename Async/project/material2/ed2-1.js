const one = () => Promise.resolve('One!');

async function myFunc() {
    console.log('In function!');//这个代码马上执行
    const res = await one();
    console.log(`hah`);// 这个代码一定需要 await 完成之后才能执行。
}

console.log('Before function!');
// const x = myFunc();
// console.log(x);
myFunc();
console.log('After function!');

// 这里可以研究 async function 的执行顺序行为。
// 这里的顺序行为是比较怪异的。