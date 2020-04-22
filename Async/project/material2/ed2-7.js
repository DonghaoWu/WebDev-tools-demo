setTimeout(() => {
    console.log(`setTimeout callback`)
}, 0);

const promiseA = new Promise((resolve) => resolve());

console.log(`I am sync job 1!`);

promiseA.then(() => {
    console.log('PromiseA success!');
})
console.log(`I am sync job 2!`);
console.log(`I am sync job 3!`);

// 这个例子是纯讨论 event loop 的执行优先级的。
// 在这里想起将一个 promise 函数化，和直接调用 promise 的区别。
// 函数化的 promise 运行后返回一个 promise， 每个 promise 都自带 .then和.catch 函数。
// 以上观点都是对之前认识的加深。