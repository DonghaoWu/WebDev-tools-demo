const a = () => {
    setTimeout(() => {
        console.log(`result of a()`)
    }, 500)
}

const b = () => {
    setTimeout(() => {
        console.log(`result of b()`)
    }, 498)
}

const c = () => {
    setTimeout(() => {
        console.log(`result of c()`)
    }, 1200)
}

a();
console.log(`a() is done!`)

b();
console.log(`b() is done!`)

c();
console.log(`c() is done!`)

// 这里展示的是必须符合两个条件之后才能执行 callback： 时间到了 + 栈空了
// 这里展示了一个偏极端的例子，把a 的时间设为500，b设为 498，最后先执行的是 a。
//因为执行函数是从上到下执行的，先执行a，后执行b，之间有一个时间差，
//这样说就算 a 等500，但由于是早一点等，所以也是先达到需要的两个条件的。
//这里有一个副作用，就是延时会比原来的有差距，都会比原来的长。