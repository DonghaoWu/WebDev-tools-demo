const promiseA = Promise.resolve(`result of a().`);

console.log(`I am sync job 1!`);

promiseA
    .then((result) => {
        console.log('PromiseA success', result)
    })
    .catch(err => {
        console.log('Promise error:', err)
    })
    .finally(() => {
        console.log(`a() is done!`);
    })

console.log(`I am sync job 2!`);
console.log(`I am sync job 3!`);

//这里展示了多个 promise 定义方法
// 同时讨论了 .then 的执行顺序。

// 这里一个设想是，如果要处理和设定多个 async 动作的顺序，可以把他们一并放进 使用关键词 async 定义的函数， 后面验证这个观点。
// 但是在 async 或者 promise 中设立 同步动作会马上执行，所以 async 里面放什么也是需要考虑的。