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
- [9.5 Async / Await.](#9.5)
- [9.5 callback -> Promise -> async / await](#9.5)
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

### <span id="8.2">`Step2: Promise.`</span>

- #### Click here: [BACK TO CONTENT](#8.0)

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

3. 

### <span id="8.5">`Step5: About event loop.`</span>

- #### Click here: [BACK TO CONTENT](#8.0)

    1. What type of queue are in event loop?
        - Within the Event Loop, there are actually two types of queues: the (macro)task queue (or just called the task queue), and the microtask queue. The (macro)task queue is for (macro)tasks and the microtask queue is for microtasks.

        `(Macro)task: `setTimeout | setInterval

        `Microtask: `process.nextTick | `Promise callback` | queueMicrotask 

    2. What is the queue priority?

        1. `The event loop is endlessly running single-threaded loop that runs on the main JavaScript thread and listens for the different events. Its job is to accept callback functions and execute them on the main thread. `Since event loop runs on the main thread, if the main thread is busy, event loop is basically dead for that time.`(event loop 的作用就是存储 callback并在适当的条件下把 callback 放回 call stack 执行，而我们的 callback 或者 promise 方案就是为了能人工编排 event loop 的输出顺序。)`

        2. The macrotask queue is a queue of the callback function waiting to be executed. `The event loop pushes oldest queued callback functions (FIFO) from macrotask queue on to the main call stack one at the time where they are executed synchronously. Event loop only pushes a callback function to the stack when the stack is empty or when the main thread is not busy.`(event loop 执行先进先出顺序，但也要看是否有 多个 async 动作并行的情况。)

        3. `The call stack will become empty when all synchronous function calls are executed. `（先执行 sync function）

        4. `.then` and `.catch` as well as `.finally` methods of a promise register the callback functions passed to them and these callbacks are provided to the event loop when the promise is resolved or rejected. These callbacks are added to the microtask queue which has `higher` priority than macrotask queue.` Hence event loop will prefer to execute them first.` `（then 和 catch 都属于 promise callback， 都会被放在 microtask queue 中，这里还提到 promise callback 放进 event loop 的时机是在 promise 的 resolve 或者 reject 的时候。）`

    3. How does event loop work?
        1. So when is a then(), catch() or finally() callback executed? The event loop gives a different priority to the tasks:

            1. All functions in that are currently in the `call stack` get executed. When they returned a value, they get popped off the stack.
            2. When the call stack is empty, all queued up microtasks are popped onto the callstack one by one, and get executed! (Microtasks themselves can also return new microtasks, effectively creating an infinite microtask loop 😬)
            3. If both the call stack and microtask queue are empty, the event loop checks if there are tasks left on the (macro)task queue. The tasks get popped onto the callstack, executed, and popped off!

            翻译成中文，就是：
            1. 所有在 call stack 中的函数，一旦遇到关键词 return 或者其他 关键词，都会从 call stack 中撤出。
            2. 只有当 call stack 清空之后，在 `microtasks(Promise所在群组)`中的函数会优先一个一个放进 call stack 并逐个执行
            3. 只有所有 call stack 和 microtasks 都清空之后，最后 event loop 才会去查看`(macro)task queue`.

        2. call stack + event loop + asynchronous non-blocking I/O model
            1. `The event loop is endlessly running single-threaded loop that runs on the main JavaScript thread and listens for the different events. Its job is to accept callback functions and execute them on the main thread. `Since event loop runs on the main thread, if the main thread is busy, event loop is basically dead for that time.`(这句话又颠覆了前面的认识，这里确实是两条流水线，但是在 asynchronous non-blocking I/O model 生产线完成后，接下来的 callback 还是要返回主线执行，在这期间 callback 都被安排在 event loop，而我们的 callback 或者 promise 方案就是为了能人工编排 event loop 的输出顺序，同时也是 callback 的执行顺序。)`

            2. The macrotask queue is a queue of the callback function waiting to be executed. `The event loop pushes oldest queued callback functions (FIFO) from macrotask queue on to the main call stack one at the time where they are executed synchronously. Event loop only pushes a callback function to the stack when the stack is empty or when the main thread is not busy.`(这里解释了 event loop 的作用)

            3. `The call stack will become empty when all synchronous function calls are executed. `（先执行 sync function）

            4. then and catch as well as finally methods of a promise register the callback functions passed to them and these callbacks are provided to the event loop when the promise is resolved or rejected. These callbacks are added to the microtask queue which has `higher` priority than macrotask queue.` Hence event loop will prefer to execute them first.` `（then 和 catch 都属于 callback， 都会被放在 queue 中，当栈空了之后才会调用。）`

#### `Comment:`
1. 

### <span id="8.6">`Step6: Things you should know before using promise.`</span>

- #### Click here: [BACK TO CONTENT](#8.0)

    1. One important side note here is that “someAsyncOperation(someParams)” is not a Promise itself but a function that returns a Promise.`(这个纠正了我刚开始时的认识)`

    2. `just like with callback based APIs, this is still asynchronous operations.` The code that is executed when the request has finished — that is, the subsequent .then() calls — `is put on the event loop just like a callback function would be. This means you cannot access any variables passed to or declared in the Promise chain outside the Promise.` The same goes for errors thrown in the Promise chain. You must also have at least one .catch() at the end of your Promise chain for you to be able to handle errors that occur. If you do not have a .catch(), any errors will silently pass and fade away and you will have no idea why your Promise does not behave as expected.`(这个纠正了我刚开始时的认识，因为 asynchronous operations 的 call back 都是在 sync operation 全部结束后才运行的，所以对 sync 不能传输任何变量。)`

    3. `这里有一个很重要的认识，promise 就是一个 object，一个函数返回 promise，外部函数是无法使用 promise 里面生成的数据的，所以如果要使用 promise 链中的数据，只能在 .then 中运用。`

    4. `一个比较隐蔽的情况是，在定义 resolve 和 reject 时，对接数据的是 then 和 catch 内建函数，具体后面详细解释。`

    5. As stated above, callbacks are not interchangeable with Promises. `This means that callback-based APIs cannot be used as Promises. `（无法直接嫁接使用，但可以尝试从一套方案转换到另一套方案。）

    6. But an important thing to remember about promises is that even when we are calling resolve or reject immediately, i.e., `without an async function, its callback handlers will be called only when the main JavaScript execution has done all pending work. That means, once the stack is empty, our promise handlers will get executed. `(这里是关于 then 和 catch 的执行时机的进一步说明，看上去 then 是马上执行，实际上是需要一定的条件才调用的，因为它们依然是在 event loop 里面的 callback。）

    7. Another important thing to remember is, catch handler will be invoked by the promise not only when we reject the promise `but even when JavaScript encounter runtime error in the executor function of the promise.`（这里讨论 catch 也可以自动捕捉系统错误。）

    8. Both catch and finally handlers are optional. But it is not safe to eliminate catch handler completely. `This is because even though we are calling resolve from inside the promise executor function, there might be hidden bugs which throw the runtime error.` Since we haven’t registered a callback function to handle the promise failure in catch handler method, `the error will be thrown in our main execution context which might crash our program.`(不捕捉处理错误会导致程序崩溃。)

    9. Even though promises are cool, there are certain limitations with them. `For example, they are not cancellable. Once a promise is created, it can not be terminated. This means, its handlers will invoke sometime in the future, no matter what.`（安全性问题。）

    10. Another thing about promises is, they are not replayable or retriable. Once a promise is resolved and handled, `you can not invoke it again to do the same task. This is one of the frustrating drawbacks of promise.`

#### `Comment:`
1. 

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