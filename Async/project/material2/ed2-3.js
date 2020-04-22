const a = (cb) => {
    setTimeout(() => {
        console.log(`result of a()`);
        cb();
    }, 500)
}

const b = (cb) => {
    setTimeout(() => {
        console.log(`result of b()`);
        cb();
    }, 1000)
}

const c = (cb) => {
    setTimeout(() => {
        console.log(`result of c()`);
        cb();
    }, 1200)
}

a(() => console.log(`a() is done!`));
b(() => console.log(`b() is done!`));
c(() => console.log(`c() is done!`));

// 这里介绍的是方案就是，同步执行异步函数，然后在异步函数中执行同步函数。