

// const a = () => {
//     setTimeout(() => console.log('result of a()'), 1000);
// }
// const b = () => {
//     setTimeout(() => console.log('result of b()'), 1000);
// }
// const c = () => {
//     setTimeout(() => console.log('result of c()'), 1000);
// }

// a();
// b();
// c();
const a = (callback) => {
    setTimeout(() => {
        console.log('result of a()');
        callback();
    }, 1000);
}
const b = (callback) => {
    setTimeout(() => {
        console.log('result of b()');
        callback();
    }, 1000);
}
const c = (callback) => {
    setTimeout(() => {
        console.log('result of c()');
        callback();
    }, 1000);
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
