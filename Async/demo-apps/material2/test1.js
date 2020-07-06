// const promiseA = new Promise((resolve, reject) => {
//     console.log(`Creating promise`);

//     setTimeout(() => {
//         reject(`something bad happened in a()!`)
//     }, 1000);

//     console.log(`Exiting promise executot.`)
// })

// console.log(`I am sync job 1!`);

// promiseA
//     .then((res) => {
//         console.log(`PromiseA success:`, res);
//     })
//     .catch(err => {
//         console.log('promiseA error:', err)
//     })
//     .finally(() => {
//         console.log(`a() is done!`);
//     });

// console.log(`I am sync job 2!`);
// console.log(`I am sync job 3!`);

// function myFunc(){
//     console.log(`haha`);
//     return 1;
// }

// setTimeout(() => {
//     console.log(`setTimeout callback`)
// }, 0);

// const promiseA = new Promise((resolve) => {
//     console.log(`in the function!`);
//     resolve();
// });

// console.log(`I am sync job 1!`);

// promiseA.then(() => {
//     console.log('PromiseA success!');
// })
// console.log(`I am sync job 2!`);
// console.log(`I am sync job 3!`);

/*
执行顺序：理解这个可以理解执行器的执行顺序。

setTimeout开始计时，---> 同时把 console.log(`setTimeout callback`) 放进 queue
promiseA 定义里的 console.log
console.log(`I am sync job 1!`);
promiseA ---> 同时把 console.log('PromiseA success!'); 放进 queue
console.log(`I am sync job 2!`);
console.log(`I am sync job 3!`);
优先调用 queue 中的 promise callback
最后调用 另外一个 queue 中的 setTimeout 的 callback。

*/

// const promiseA = Promise.resolve(`result of a().`);

// console.log(`I am sync job 1!`);

// promiseA
//     .then((result) => {
//         console.log('PromiseA success', result)
//     })
//     .catch(err => {
//         console.log('Promise error:', err)
//     })
//     .finally(() => {
//         console.log(`a() is done!`);
//     })

// console.log(`I am sync job 2!`);
// console.log(`I am sync job 3!`);

// Promise.reject('Reject DATA!')
//     .then((result) => {
//         console.log('[1] then', result); // won't be called
//         return '[2] then payload';
//     })
//     .finally(() => {
//         console.log('[1] finally'); // first finally will be called
//         return '[1] finally payload';
//     })
//     .then((result) => {
//         console.log('[2] then', result); // won't be called
//         return '[2] then payload';
//     })
//     .catch((error) => {
//         console.log('[1] catch', error);  // first catch will be called
//         return '[1] catch payload';
//     })
//     .catch((error) => {
//         console.log('[2] catch', error);  // won't be called
//         return '[2] catch payload';
//     })
//     .then((result) => {
//         console.log('[3] then', result); // will be called
//         return '[3] then payload';
//     })
//     .finally(() => {
//         console.log('[2] finally'); // will be called
//         return '[2] finally payload';
//     })
//     .catch((error) => {
//         console.log('[3] catch', error);  // won't be called
//         return '[3] catch payload';
//     })
//     .then((result) => {
//         console.log('[4] then', result); // will be called
//         return '[4] then payload';
//     });

// Promise.resolve( 'Fulfill DATA!' )
// .then( ( result ) => {
//     console.log( '[1] then', result );

//     // inner promise
//     return new Promise( ( resolve, reject ) => {
//         setTimeout( () => {
//             reject( 'Nested promise error data!' );
//         }, 1000 );
//     } ).then( ( data ) => {
//         return `Inner promise data: ${ data }`;
//     } );
// } )
// .then( ( result ) => {
//     console.log( '[2] then', result );
// } )
// .catch( ( error ) => {
//     console.log( '[1] catch', error ); // for main and inner promise
// } );





// const a = () => new Promise(resolve => {
//     setTimeout(() => resolve('result of a()'), 1000);
// });

// const b = () => new Promise(resolve => {
//     setTimeout(() => resolve('result of b()'), 500);
// });

// const c = () => new Promise(resolve => {
//     setTimeout(() => resolve('result of c()'), 1100);
// });

// a().then( ( result ) => {
//     console.log( 'a() success:', result );

//     b().then( ( result ) => {
//         console.log( 'b() success:', result );

//         c().then( ( result ) => {
//             console.log( 'c() success:', result );
//         } );

//     } );
// } )
// .catch( ( error ) => {
//     console.log( 'a() error:', error );
// } );

// a()
//     .then(res => {
//         console.log('a() success:', res);
//         return b();
//     })
//     .then(res => {
//         console.log('b() success:', res);
//         return c();
//     })
//     .then(res => {
//         console.log('c() success:', res);
//     })
//     .catch(err => {
//         console.log( 'a() error:', err );
//     })

// const myFunc = async () => {
//     try {
//         const res1 = await a();
//         console.log('a() success:', res1);
//         const res2 = await b();
//         console.log('b() success:', res2);
//         const res3 = await c();
//         console.log('c() success:', res3);
//     } catch (error) {
//         console.log(error);
//     }
// }

// myFunc();

// const a = () => new Promise(resolve => {
//     setTimeout(() => resolve('result of a()'), 1000);
// });

// const b = () => new Promise(resolve => {
//     setTimeout(() => resolve('result of b()'), 500);
// });

// const c = () => new Promise(resolve => {
//     setTimeout(() => resolve('result of c()'), 1100);
// });


// const doJobs = async () => {
//     var resultA = await a();
//     var resultB = await b();
//     var resultC = await c();

//     return [resultA, resultB, resultC];
// };

// doJobs()
//     .then((result) => {
//         console.log('success:', result);
//     })
//     .catch((error) => {
//         console.log('error:', error);
//     });

// console.log('I am a sync operation!');

// const a = () => new Promise(resolve => {
//     setTimeout(() => resolve('result of a()'), 1000); // 1s delay
// });

// const b = () => new Promise((resolve, reject) => {
//     setTimeout(() => reject('result of b()'), 500); // 0.5s delay
// });

// const c = () => new Promise(resolve => {
//     setTimeout(() => resolve('result of c()'), 1100); // 1.1s delay
// });


// const doJobs = async () => {
//     try {
//         var resultA = await a();
//         var resultB = await b();
//         var resultC = await c();

//         return [resultA, resultB, resultC];
//     } catch (error) {
//         return [null, null, null];
//     }
// };

// // doJobs() returns a promise
// doJobs()
//     .then((result) => {
//         console.log('success:', result);
//     })
//     .catch((error) => {
//         console.log('error:', error);
//     });

// // normal flow
// console.log('I am a sync operation!');

const promiseA = new Promise((resolve) => {
    console.log('ExecutorA: Begin!');
    resolve('A');
    console.log('ExecutorA: End!');
});

const promiseB = new Promise((resolve) => {
    console.log('ExecutorB: Begin!');
    resolve('B');
    console.log('ExecutorB: End!');
});


// Promise: classical approach
const getPromiseClassical = () => {
    console.log('getPromiseClassical()');

    return promiseA.then((resultA) => {
        console.log('promiseClassical: A');

        return promiseB.then((resultB) => {
            console.log('promiseClassical: B');
            console.log('Classical: Promises resolved: ', resultA, resultB);
        });
    });
};
const promiseClassical = getPromiseClassical();

// Promise: async/await
const getPromiseAsync = async () => {
    console.log('getPromiseAsync()');

    const resultA = await promiseA;
    console.log('promiseAsync: A');

    const resultB = await promiseB;
    console.log('promiseAsync: B');
    console.log('Async: Promises resolved: ', resultA, resultB);
};
const promiseAsync = getPromiseAsync();