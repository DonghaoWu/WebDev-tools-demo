# Web development tools (Part 9)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Front-end`(Async - Research "code" )

### `Summary`: In this documentation, we deep dive in JS async, code example part.

### `Check Dependencies:`

- 

------------------------------------------------------------

#### `本章背景：`
- 

### <span id="9.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [9.1 Callback hell.](#9.1)
- [9.2 Promise.](#9.2)
- [9.3 From callback to Promise.](#9.3)
- [9.4 Executing order in event loop.](#9.4)
- [9.5 From Promise to async / await.](#9.5)
- [9.6 Async / Await.](#9.6)
- [9.7 callback -> Promise -> async / await](#9.7)

- [9.6 Things you should know before using Promise.](#9.6)
- [9.7 About async/await.](#9.7)
- [9.8 More about async function.](#9.8)

------------------------------------------------------------

### <span id="9.1">`Step1: Callback hell.`</span>

- #### Click here: [BACK TO CONTENT](#9.0)

    - Edition 1:
    ```js
    const a = () => {
        setTimeout(() => console.log('result of a()'), 1000);
    }
    const b = () => {
        setTimeout(() => console.log('result of b()'), 1000);
    }   
    const c = () => {
        setTimeout(() => console.log('result of c()'), 1000);
    }

    // call in sequence

    a();
    console.log('a() is done!');
    b();
    console.log('b() is done!');
    c();
    console.log('c() is done!');
    ```

    - Edition 2:

    ```js
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

    a( () => console.log('a() is done!') );
    b( () => console.log('b() is done!') );
    c( () => console.log('c() is done!') );
    ```

    得到：

    ```bash
    result of a()
    a() is done!
    result of b()
    b() is done!
    result of c()
    c() is done!
    ```
    #### `Comment:`
    1. 上面的例子说明把 sync 放进 async 的 callback 里面可以保证 async 一些动作先于 sync。

    - Edition 3:

    ```js
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
    // 这个结构维护起来确实有点困难。
    // 这里介绍使用 callback hell 设计固定执行顺序。
    // 这个理念相当于按设计主动清空栈，从而把异步保证了顺序
    // 把原来异步执行的动作安排成同步顺序操作，且可以保证了延时的准确。
    ```

#### `Comment:`
1. 

### <span id="9.2">`Step2: Promise.`</span>

- #### Click here: [BACK TO CONTENT](#9.0)

1. 定义方式：

    ```js
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
        })
    ```


    #### `Comment:`
    1. 注意 Promise 定义的时候就已经在执行 setTimeout 的计时，而不是使用 .then 时才开始。

2. “promisification”：

    ```js
    function getAsyncData(someValue){
        return new Promise(function(resolve, reject){
            getData(someValue, function(error, result){
                if(error){
                    reject(error);
                }
                else{
                    resolve(result);
                }
            })
        });
    }
    ```

    #### `Comment:`
    1. 直接定义 Promise 会运行里面的代码，这种用函数包装形式就不会。

    2. Note that it is within the function being passed to the Promise constructor that we start the asynchronous operation. That function is then responsible for calling resolve(success) when it’s done or reject(error) if there are errors.`（high-order function）`

    3. The process of wrapping a callback based asynchronous function inside a Promise and return that promise instead is called “promisification”. We are “promisifying” a callback-based function. There are lots of modules that let you do this in a nice way but since version 8 NodeJs has a built in a helper called “util.promisify” for doing exactly that.`(专业名词)`

3. promise 的定义过程会执行里面的函数：

    ```js
    const promiseA = new Promise((resolve, reject) =>{
        console.log(`Creating promise`);

        setTimeout(()=>{
            reject(`something bad happened in a()!`)
        }, 1000);

        console.log(`Exiting promise executot.`)
    })
    ```

    #### `Comment:`
    1. 在执行这个代码的过程中，两个 console.log 在定义过程中竟然调用了, 这个定义函数的过程不一样，如

    ```js
    function myFunc(){
        console.log(`haha`);
        return 1;
    }
    ```

    2. 这里说明 promise 的定义过程也是执行过程，如果要防止定义即执行，参考 step 2 -- “promisification”。

4. promise 里面的 catch 捕捉系统错误 / runtime error。

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

5. 关于 promise.all 和 promise.race

    1. `promise.race 例子`

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

    2. `promise.all 例子`

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

    - 使用 async 代替 promise.all
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

    #### `Comment:`
    1. 

### <span id="9.3">`Step3: From callback to Promise.`</span>

- #### Click here: [BACK TO CONTENT](#9.0)


#### `Comment:`
1. 

### <span id="9.4">`Step4: Executing order in event loop.`</span>

- #### Click here: [BACK TO CONTENT](#9.0)

1. event loop 的优先级：

    ```js
    console.log(`start`);

    setTimeout(()=>{
        console.log('Timeout!')
    }, 0);

    Promise.resolve('Promise')
    .then(res => console.log(res));

    console.log(`End!`);

    /*
    执行顺序：
    sync --->
    1. console.log(`start`);
    2. setTimeout  ---> 开始计时
    3. Promise.resolve('Promise')
    4. console.log(`End!`);

    queue --->
    6. console.log('Promise');  >>> microtasks(Promise所在群组)
    7. console.log('Timeout!'); >>>`(macro)task queue`

    这里例子里面最好的设计就是把 setTimeout 的时间设计为 0.
    */
    ```

2. Promise 里面的函数不都是异步的，同步的也会马上执行。
    - example 1:
    ```js
    console.log(`start`);

    setTimeout(() => {
        console.log('Timeout!')
    }, 0);

    Promise.resolve(console.log('Promise'))

    console.log(`End!`);
    /*
    执行顺序：
    sync --->
    1. console.log(`start`);
    2. setTimeout  ---> 开始计时
    3. console.log('Promise')
    4. console.log(`End!`);

    queue --->
    5. console.log('Timeout!'); >>>`(macro)task queue`
    */
    ```

    #### `Comment:`
    1. 这种定义 Promise 的方式不常用，正规的方法参考 example 2。

    - example 2:
    ```js
    setTimeout(() => {
        console.log(`setTimeout callback`)
    }, 0);

    const promiseA = new Promise((resolve) => {
        console.log(`in the function!`);
        resolve();
    });

    console.log(`I am sync job 1!`);

    promiseA.then(() => {
        console.log('PromiseA success!');
    })
    console.log(`I am sync job 2!`);
    console.log(`I am sync job 3!`);
    /*
    执行顺序：理解这个可以理解 event loop 的执行顺序。
    sync --->
    1.setTimeout开始计时，---> 同时把 console.log(`setTimeout callback`) 放进 queue
    2.promiseA 里的 console.log(`in the function!`);
    3.console.log(`I am sync job 1!`);
    4.把 promiseA 的 then callback ---> console.log('PromiseA success!'); 放进 queue
    5.console.log(`I am sync job 2!`);
    6.console.log(`I am sync job 3!`);

    queue --->
    7. console.log('PromiseA success!');
    8. console.log(`setTimeout callback`)

    优先调用 queue 中的 promise callback
    最后调用 另外一个 queue 中的 setTimeout 的 callback。
    */
    ``` 

    - example 3:
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

    #### `Comment:`
    1. `The biggest misconception about Promises in JavaScript is that they are asynchronous. Well, not everything of Promises is asynchronous. `

    2. 以上例子说明：`The executor function of a promise also runs in a synchronous manner. `Since we have a setTimeout call in the executor function which contains resolve call, it will execute when all asynchronous code is executed. `(当编译器从上到下执行时，遇到 promise 会先执行 promise 里面的 sync function，然后把 async function 放进 event loop 的对应 queue 中，这个是跟之前以为 promise 就全部放在 queue 的认识不一样)`

3. Promise 在 event loop 中的执行顺序。
    ```js
    const promiseA = Promise.resolve(`result of a().`);

    console.log(`I am sync job 1!`);

    promiseA
        .then((result) => {
            console.log('PromiseA success', result)
        })
        .catch(err => {
            console.log('Promise error:', err)
        })
        .finally(() => {
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

    5.promiseA 的 .then callback -----> console.log('PromiseA success', result)
    6.promiseA 的 .fanally callback -----> console.log(`a() is done!`);
    */
    ```      

### <span id="9.5">`Step5: From Promise to async / await.`</span>

- #### Click here: [BACK TO CONTENT](#9.0)

1. Promise 原生处理与 async/await 处理方式。

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

    #### `Comment:`
    1. 这里需要思考的是 .then 和 await 之间会不会产生竞争关系，也就是并行的 promise 在 event loop 中的执行顺序，`这是目前剩下的很大疑问`。

2. 使用 promise 原生方式包装一个 promise 函数，对比使用 async/await 方式包装一个 promise。

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

3. `定义一个 promise 包装函数，然后定义一个 async 函数去调用这个包装函数，最后调用这个 async 函数去获得了新的 promise。`

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

3. 用 async 代替 promise.all 的例子。

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

    #### `Comment:`
    1. 上面这个例子的分析，If any of the promises is rejected inside an async function, the promise it returns will reject as well with the error message. The returned promise is also rejected if any runtime error occurs inside the async function (similar behavior to a promise which rejects when a runtime error occurs in Promise constructors executor function). `(这个操作有崩溃风险，一个崩全部崩，需要增加 catch，这里面的关键词是 捕捉 runtime error。)`

    2. In the above example, promise returned by b() rejects which crashes the thread in which async function is running and it is handled by catch handler of the promise it returns. `To safely handle promise rejections, we should use try/catch method inside async functions.`

4. 把上一段代码添加 `try/catch`。

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

### <span id="9.6">`Step6: Async / Await.`</span>

- #### Click here: [BACK TO CONTENT](#9.0)

1. 调用 async 定义函数并分析执行顺序：

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

    #### `Comment:`
    1. In the above example, we have created a function myFunction which has async keyword on it. This keyword makes it asynchronous, `which means when this function is called, a promise is returned and normal code execution will commence as usual.`

    2. We can say, await keyword `inside a async function blocks the execution of JavaScript in that function context` until the promise it is awaiting is settled. This gives us cleaner syntax to work with promises in a synchronous fashion.`（ 从 await 开始 后面的代码就相当于进入了一条 promise 链条。）`


### <span id="9.7">`Step7: callback -> Promise -> async / await.`</span>

- #### Click here: [BACK TO CONTENT](#9.0)

    1.  promise nesting 的进化： 

    - Edition 1: `（ promise + callback + 多个 catch）`

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

    - Edition 2: `（promise + callback + 合并 catch）`
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

    - Edition 3:`（ promise + return promise chain ）`
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

    - Edition 4:`（async + promise）`

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
    #### `Comment:`
    1. (版本4 的注释) When we put async keyword before a function declaration, `it will return a promise and we can use await keyword inside it which blocks the code until promise it awaits resolves or rejects.`(整个 async function 无论怎样都返回 promise。)

### <span id="8.7">`Step7: About async/await.`</span>

- #### Click here: [BACK TO CONTENT](#8.0)

    1. What is the pros to use async/await?
        1. We can create async functions that implicitly return a promise. `这是个很重要的认识，所有用 async 定义的函数都是返回一个 promise`

        2. With the await keyword, `we can suspend the asynchronous function while we wait for the awaited value return a resolved promise. If we want to get the value of this resolved promise, like we previously did with the then() callback, we can assign variables to the awaited promise value!` （这个过程就是 promise 完成了 resolve 然后 调用 then 的过程压缩了，只不过这里更直观更好处理，可以把值放在自定义变量上。）

        3. `The async function declaration defines an asynchronous function, which returns an AsyncFunction object. An asynchronous function is a function which operates asynchronously via the event loop, using an implicit Promise to return its result. But the syntax and structure of your code using async functions is much more like using standard synchronous functions`（async function 的定义，就是内部运行 promise 的功能集合，同时`在 await 开始，之后的代码都进入了 promise链，这个很重要。`）

        4. Promises and async/await accomplish the same thing. 

        5. A function call can only have the await keyword `if the function being called is “awaitable”.` A function is “awaitable” if it has the async keyword or if it returns a Promise. Functions with the async keyword are interchangeable with functions that returns Promises which is why I stated that a function that returns a Promise is “awaitable”.`这个解释很好`

        6. async functions return a promise.

        7. await is always for a single Promise.

        8. async functions use an implicit Promise to return results. Even if you don’t return a promise explicitly, the async function makes sure that your code is passed through a promise.`(意味着可以接着这个 function 使用 .then 或者 .catch)`

        9. There can be multiple await statements within a single async function.

        10. When using async await, make sure you use `try catch for error handling.`

        11. Be extra careful when using await within loops and iterators. You might fall into the trap of writing sequentially-executing code when it could have been easily done in parallel.

        12. await only blocks the code execution within the async function. It only makes sure that the next line is executed when the promise resolves. So, if an asynchronous activity has already started, await will not have any effect on it.

    2. What does async function return?
        1. One major advantage that async/await syntax brings is the ability to create async generators. `By making generator function async, we can use `__await__` keyword with each yield statement which returns a value when the corresponding promise is resolved.`（强化 await 开始 promise 链的概念，同时 await 也解决了把 promise 分段的功能。）`

        2. Is async/await blocks the main thread？

            - From await syntax keyword looks like that it blocks the execution of the thread until the promise it is awaiting on resolves. `But that’s is not the case.` The while async/await pattern is still based on classical Promise syntax. The await keyword is like a then callback that wraps all the statements below it.`（强化 从第一个 await 就开始 promise 链的概念。)`

        3. Async/await may make your asynchronous calls look more synchronous but it is still executed the same way as if it were using a callback or promise based API. `The asynchronous I/O operations will still be processed in parallel and the code handling the responses in the async functions will not be executed until that asynchronous operation has a result.` Also, `even though you are using async/await you have to sooner or later resolve it as a Promise in the top level of your program.` This is because async and await are just syntactical sugar for automatically creating, returning and resolving Promises.

    3. Promise or async/await?  (关键判断 ：parallel --- 平行)

        1. The async function returns a promise. The converse is also true. `Every function that returns a promise can be considered as async function.`(都会在 sync 之后执行。)

        2. If two functions can be run in parallel, create two different async functions and then run them in parallel.

        3. To run promises in parallel, create an array of promises and then use Promise.all(promisesArray).

        4. __`Every time you use await remember that you are writing blocking code. Over time we tend to neglect this.`__

        5. Instead of creating huge async functions with many await asyncFunction() in it, it is better to create smaller async functions. This way, we will be aware of not writing too much blocking code.

        6. Another advantage of using smaller async functions is that you force yourself to think of which async functions can be run in parallel.

#### `Comment:`
1. 

### <span id="8.8">`Step8: More about async function.`</span>

- #### Click here: [BACK TO CONTENT](#8.0)
- #### Click here: [Part7: Async-Promise](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/Async/Async-Promise.md)

- #### Click here: [Part9: Async-Research (code)](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/Async/Async-Research(code).md)


- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)