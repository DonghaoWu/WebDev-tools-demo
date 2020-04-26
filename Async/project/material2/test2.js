const promiseA = new Promise((resolve, reject) => {
    console.log(`inside promise`)
    setTimeout(() => {
        resolve('result of a()')
    }, 1000)
    console.log(`end promise`)
});
console.log(`outside promise`)
promiseA
    .then((res) => {
        console.log(res);
    })
    .catch(err => {
        console.log('promiseA error:', error)
    })
    .finally(() => {
        console.log(`a() is done!`);
    })