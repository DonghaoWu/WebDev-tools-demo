
- 代码展示

    1.  promise nesting 的进化： 
    - 版本一 `（ promise + callback + 多个 catch）`
    ```js
    const a = () => new Promise( resolve => {
        setTimeout( () => resolve( 'result of a()' ), 1000 );
    } );
    const b = () => new Promise( resolve => {
        setTimeout( () => resolve( 'result of b()' ), 500 );
    } );
    const c = () => new Promise( resolve => {
        setTimeout( () => resolve( 'result of c()' ), 1100 );
    } );

    a()
    .then( ( result ) => {
        console.log( 'a() success:', result );
        b()
        .then( ( result ) => {
            console.log( 'b() success:', result );
            c()
            .then( ( result ) => {
                console.log( 'c() success:', result );
            } )
            .catch( ( error ) => {
                console.log( 'c() error:', error );
            } );
            
        } )
        .catch( ( error ) => {
            console.log( 'b() error:', error );
        } );
    } )
    .catch( ( error ) => {
        console.log( 'a() error:', error );
    } );
    ```

    版本二 `（promise + callback + 合并 catch）`
    ```js
    const a = () => new Promise( resolve => {
        setTimeout( () => resolve( 'result of a()' ), 1000 ); 
    } );
    const b = () => new Promise( resolve => {
        setTimeout( () => resolve( 'result of b()' ), 500 ); 
    } );
    const c = () => new Promise( resolve => {
        setTimeout( () => resolve( 'result of c()' ), 1100 ); 
    } );

    a().then( ( result ) => {
        console.log( 'a() success:', result );
        b().then( ( result ) => {
            console.log( 'b() success:', result );
            c().then( ( result ) => {
                console.log( 'c() success:', result );
            } );
        } );
    } )
    .catch( ( error ) => {
        console.log( 'a() error:', error );
    } );
    ```

    版本三：`（ promise + return promise chain ）`
    ```js
    const a = () => new Promise( resolve => {
        setTimeout( () => resolve( 'result of a()' ), 1000 ); 
    } );
    const b = () => new Promise( resolve => {
        setTimeout( () => resolve( 'result of b()' ), 500 ); 
    } );
    const c = () => new Promise( resolve => {
        setTimeout( () => resolve( 'result of c()' ), 1100 ); 
    } );

    a()
        .then(res => {
            console.log('a() success:', res);
            return b();
        })
        .then(res => {
            console.log('b() success:', res);
            return c();
        })
        .then(res => {
            console.log('c() success:', res);
        })
        .catch(err => {
            console.log( 'a() error:', err );
        })
    ```

    版本四：`（async + promise）`

    ```js
    const a = () => new Promise( resolve => {
        setTimeout( () => resolve( 'result of a()' ), 1000 ); 
    } );
    const b = () => new Promise( resolve => {
        setTimeout( () => resolve( 'result of b()' ), 500 ); 
    } );
    const c = () => new Promise( resolve => {
        setTimeout( () => resolve( 'result of c()' ), 1100 ); 
    } );

    const myFunc = async () => {
        try {
            const res1 = await a();
            console.log('a() success:', res1);
            const res2 = await b();
            console.log('b() success:', res2);
            const res3 = await c();
            console.log('c() success:', res3);
        } catch (error) {
            console.log(error);
        }
    }

    myFunc();
    ```

    2. (版本4 的注释) When we put async keyword before a function declaration, `it will return a promise and we can use await keyword inside it which blocks the code until promise it awaits resolves or rejects.`(整个 async function 无论怎样都返回 promise。)

    B、event loop 里面的执行顺序：


    C、 event loop 里面的执行顺序：

    ```js
    const promiseA = Promise.resolve(`result of a().`);

    console.log(`I am sync job 1!`);

    promiseA
    .then((result) =>{
        console.log('PromiseA success', result)
    })
    .catch(err=>{
        console.log('Promise error:', err)
    })
    .finally(()=>{
        console.log(`a() is done!`);
    })

    console.log(`I am sync job 2!`);
    console.log(`I am sync job 3!`);

    /*
    执行顺序：
    sync --->
    1.promiseA
    2.console.log(`I am sync job 1!`);
    3.console.log(`I am sync job 2!`);
    4.console.log(`I am sync job 3!`);
    4.promiseA 的 .then callback -----> console.log('PromiseA success', result)
    5.promiseA 的 .fanally callback -----> console.log(`a() is done!`);
    */
    ```

    D、执行器的执行顺序：
    ```js
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

    const getPromiseClassical = () => {
        console.log('getPromiseClassical()');

        return promiseA.then( ( resultA ) => {
            console.log('promiseClassical: A');
        
            return promiseB.then( ( resultB ) => {
                console.log('promiseClassical: B');
                console.log( 'Classical: Promises resolved: ', resultA, resultB );
            } );
        } );
    };
    const promiseClassical = getPromiseClassical();

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
    ```

    6. 观点：`The biggest misconception about Promises in JavaScript is that they are asynchronous. Well, not everything of Promises is asynchronous. `

    ```js
    const promiseA = new Promise((resolve, reject) => {
        console.log(`Creating promise`);

        setTimeout(() => {
            reject(`something bad happened in a()!`)
        }, 1000);

        console.log(`Exiting promise executor.`)
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
    ```

    - 以上例子说明：`The executor function of a promise also runs in a synchronous manner. `Since we have a setTimeout call in the executor function which contains resolve call, it will execute when all asynchronous code is executed. `(当编译器从上到下执行时，遇到 promise 会先执行 promise 里面的 sync function，然后把 async function 放进 event loop 的对应 queue 中，这个是跟之前以为 promise 就全部放在 queue 的认识不一样)`

    7. 这里也发现了一个奇怪的行为，就是 promise 的定义过程会执行里面的函数：

    ```js
    const promiseA = new Promise((resolve, reject) =>{
        console.log(`Creating promise`);

        setTimeout(()=>{
            reject(`something bad happened in a()!`)
        }, 1000);

        console.log(`Exiting promise executot.`)
    })
    ```

    - 在执行这个代码的过程中，两个 console.log 在定义过程中竟然调用了, 这个定义函数的过程不一样，如

    ```js
    function myFunc(){
        console.log(`haha`);
        return 1;
    }
    ```

    - 这里说明 promise 的定义过程也是执行过程，如果要防止定义即执行，参考第四点 “promisification”

    8. promise 里面的 catch 捕捉系统错误。
    ```js
    const promiseA = new Promise((resolve, reject) => {
        i++;
        setTimeout(() => {
            resolve(i);
        }, 1000);
    });

    promiseA
        .then((result) => {
            console.log('promiseA success:', result);
        });
    ```

    9. 关于 promise.all 和 promise.race    
    - `promise.race 例子`

    ```js
    const a = () => new Promise(resolve => {
        setTimeout(() => resolve('result of a()'), 1000);
    });

    const b = () => new Promise(resolve => {
        setTimeout(() => resolve('result of b()'), 500);
    });

    const c = () => new Promise(resolve => {
        setTimeout(() => resolve('result of c()'), 1100);
    });

    Promise.race([a(), b(), c()])
        .then((data) => {
            console.log('success: ', data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
    ```

    - `promise.all 例子`

    ```js
    const a = () => new Promise(resolve => {
        setTimeout(() => resolve('result of a()'), 1000);
    });
    const b = () => new Promise(resolve => {
        setTimeout(() => resolve('result of b()'), 500);
    });
    const c = () => new Promise(resolve => {
        setTimeout(() => resolve('result of c()'), 1100);
    });

    Promise.all([a(), b(), c(), { key: 'I am plain data!' }])
        .then((data) => {
            console.log('success: ', data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
    ```

    - 用 async 代替 promise.all 的例子

    ```js
    const a = () => new Promise(resolve => {
        setTimeout(() => resolve('result of a()'), 1000);
    });
    const b = () => new Promise(resolve => {
        setTimeout(() => resolve('result of b()'), 500);
    });
    const c = () => new Promise(resolve => {
        setTimeout(() => resolve('result of c()'), 1100);
    });

    const doJobs = async () => {
        var resultA = await a();
        var resultB = await b();
        var resultC = await c();

        return [resultA, resultB, resultC];
    };

    doJobs()
        .then((result) => {
            console.log('success:', result);
        })
        .catch((error) => {
            console.log('error:', error);
        });

    console.log('I am a sync operation!');
    ```

    - 上面这个例子的分析，If any of the promises is rejected inside an async function, the promise it returns will reject as well with the error message. The returned promise is also rejected if any runtime error occurs inside the async function (similar behavior to a promise which rejects when a runtime error occurs in Promise constructors executor function). `(这个操作有崩溃风险，一个崩全部崩，需要增加 catch，这里面的关键词是 捕捉 runtime error。)`

    - In the above example, promise returned by b() rejects which crashes the thread in which async function is running and it is handled by catch handler of the promise it returns. `To safely handle promise rejections, we should use try/catch method inside async functions.`

    修改成：（添加 try catch）

    ```js
    const a = () => new Promise(resolve => {
        setTimeout(() => resolve('result of a()'), 1000);
    });
    const b = () => new Promise((resolve, reject) => {
        setTimeout(() => reject('result of b()'), 500);
    });
    const c = () => new Promise(resolve => {
        setTimeout(() => resolve('result of c()'), 1100);
    });


    const doJobs = async () => {
        try {
            var resultA = await a();
            var resultB = await b();
            var resultC = await c();

            return [resultA, resultB, resultC];
        } catch (error) {
            return [null, null, null];
        }
    };

    doJobs()
        .then((result) => {
            console.log('success:', result);
        })
        .catch((error) => {
            console.log('error:', error);
        });

    console.log('I am a sync operation!');
    ```

    10. 调用 async 定义函数的执行顺序：

    ```js
    const one = () => Promise.resolve('One!');

    async function myFunc(){
        console.log('In function!');
        const res = await one();
        console.log(res);

        //上两句相当于：
        one()
        .then(data => console.log(data));
    }

    console.log('Before function!');
    myFunc();
    console.log('After function!');

    /*
    执行顺序：
    sync --->
    1. console.log('Before function!');
    2. Promise.resolve('One!');
    3. console.log('In function!');
    4. console.log('After function!');

    queue --->
    5. console.log('One');

    这里例子证明了 myFunc 就算是 async 函数，但不一定里面的所有函数都是放在最后执行的，同时也看到了 await 的能力，在 await 开始，相当于进入了 promise 链条了，后面的函数都被打断和按顺序执行了，这个隐式的安排是初学者很难发现的。
    */
    ```

    -  In the above example, we have created a function myFunction which has async keyword on it. This keyword makes it asynchronous, `which means when this function is called, a promise is returned and normal code execution will commence as usual.`

    - We can say, await keyword `inside a async function blocks the execution of JavaScript in that function context` until the promise it is awaiting is settled. This gives us cleaner syntax to work with promises in a synchronous fashion.`（ 从 await 开始 后面的代码就相当于进入了一条 promise 链条。）`

    11. 一个返回 promise 的函数，以 async 的形式定义成另外一个函数，具有一样功能。

    ```js
    function logFetch(url) {
        return fetch(url)
            .then(response => response.text())
            .then(text => {
                console.log(text);
            }).catch(err => {
                console.error('fetch failed', err);
            });
    }
    ```

    ```js
    async function logFetchAsync(url) {
        try {
            const response = await fetch(url);
            console.log(await response.text());
        }
        catch (err) {
            console.log('fetch failed', err);
        }
    }
    ```

    12. `定义一个 promise 包装函数，然后定义一个 async 函数去调用这个包装函数，最后调用这个 async 函数去获得了一 promise。`

    ```js
    function fetchTheData(someValue){
        return new Promise(function(resolve, reject){
            getData(someValue, function(error, result){
                if(error){
                    reject(error);
                }
                else{
                    resolve(resutl);
                }
            })
        });
    }

    async function getSomeAsyncData(value){
        const result = await fetchTheData(value);
        return result;
    }

    getSomeAsyncData(‘someValue’)
        .then(function(result){
            console.log(result);
        })
        .catch(function (error){
            console.log(error);
        });
    ```
   