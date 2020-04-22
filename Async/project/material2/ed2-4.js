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

a(() => {
    console.log(`a() is done!`);
    b(() => {
        console.log(`b() is done!`);
        c(() => {
            console.log(`c() is done!`);
        })
    })
})

// 这里介绍使用 callback hell 设计固定执行顺序。
// 这个理念相当于按设计主动清空栈，从而把异步保证了顺序
// 把原来异步执行的动作安排成同步顺序操作，且可以保证了延时的准确。