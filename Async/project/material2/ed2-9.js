const a = () => new Promise(resolve => {
    setTimeout(() => resolve('result of a()'), 1000); // 1s delay
});

const b = () => new Promise(resolve => {
    setTimeout(() => resolve('result of b()'), 500); // 0.5s delay
});

const c = () => new Promise(resolve => {
    setTimeout(() => resolve('result of c()'), 1100); // 1.1s delay
});


// 方案一
// a()
// .then( ( result ) => {
//     console.log( 'a() success:', result );

//     b()
//     .then( ( result ) => {
//         console.log( 'b() success:', result );

//         c()
//         .then( ( result ) => {
//             console.log( 'c() success:', result );
//         } )
//         .catch( ( error ) => {
//             console.log( 'c() error:', error );
//         } );

//     } )
//     .catch( ( error ) => {
//         console.log( 'b() error:', error );
//     } );
// } )
// .catch( ( error ) => {
//     console.log( 'a() error:', error );
// } );

// 方案二
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


// 方案三
a()
    .then(res1 => {
        console.log(res1);
        return b();
    })
    .then(res2 => {
        console.log(res2);
        return c();
    })
    .then(res3 => {
        console.log(res3);
    })
    .catch(err => {
        console.log(err);
    })

// 这个从方案一到方案三到改变，如果理解了就可以更好的掌握 promise 的使用。