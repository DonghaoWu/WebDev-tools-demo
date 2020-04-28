

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
// const a = (callback) => {
//     setTimeout(() => {
//         console.log('result of a()');
//         callback();
//     }, 1000);
// }
// const b = (callback) => {
//     setTimeout(() => {
//         console.log('result of b()');
//         callback();
//     }, 1000);
// }
// const c = (callback) => {
//     setTimeout(() => {
//         console.log('result of c()');
//         callback();
//     }, 1000);
// }

// a(() => {
//     console.log(`a() is done!`);
//     b(() => {
//         console.log(`b() is done!`);
//         c(() => {
//             console.log(`c() is done!`);
//         })
//     })
// })

const promiseA = new Promise( ( resolve ) => {
    console.log('ExecutorA: Begin!');
    resolve( 'A' );
    console.log('ExecutorA: End!');
} );

const promiseB = new Promise( ( resolve ) => {
    console.log('ExecutorB: Begin!');
    resolve( 'B' );
    console.log('ExecutorB: End!');
} );

// Promise: classical approach

// const getPromiseClassical = () => {
//     console.log('getPromiseClassical()');

//     return promiseA.then( ( resultA ) => {
//         console.log('promiseClassical: A');
    
//         return promiseB.then( ( resultB ) => {
//             console.log('promiseClassical: B');
//             console.log( 'Classical: Promises resolved: ', resultA, resultB );
//         } );
//     } );
// };
// const promiseClassical = getPromiseClassical();

// Promise: async/await

const getPromiseAsync = async () => {
    console.log('getPromiseAsync()');

    const resultA = await promiseA;
    console.log('promiseAsync: A');

    const resultB = await promiseB;
    console.log('promiseAsync: B');
    console.log('Async: Promises resolved: ', resultA, resultB );
};
const promiseAsync = getPromiseAsync();
