const promiseA = new Promise((resolve, reject) => {
    console.log(`Creating promise`);

    setTimeout(() => {
        reject(`something bad happened in a()!`)
    }, 1000);

    console.log(`Exiting promise executot.`)
})

console.log(`I am sync job 1!`);

promiseA
    .then((res) => {
        console.log(`PromiseA success:`, res);
    })
    .catch(err => {
        console.log('promiseA error:', err)
    })
    .finally(() => {
        console.log(`a() is done!`);
    });

console.log(`I am sync job 2!`);
console.log(`I am sync job 3!`);


// 这里更深度讨论了 promise 的内部执行顺序。
// 这里不是简单讨论内部顺序，还讨论了 两种函数的优先级问题。
// 这个情况有点复杂，因为它是把低优先级的函数放在高优先级的函数中执行的，具体情况分析后补。