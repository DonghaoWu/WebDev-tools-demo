const promiseA = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('result of a()')
    }, 1000)
});

promiseA
    .then((res) => {
        console.log(res);
    })
    .catch(err => {
        console.log('promiseA error:', error)
    })
    .finally(() => {
        console.log(`a() is done!`);
    });

//这里展示了怎样创造一个 promise ，怎样执行一个 promise， promise 是按什么顺序执行的。