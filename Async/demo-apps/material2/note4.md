专业名词：

- Ajax
- async programming
    - AJAX Call
    - setTimeout or setInterval
    - Reading a file
    - Events
- async activity
- Web APIs
- promisification

- AJAX, which stands for Asynchronous JavaScript And XML and callbacks were an OG way of handling asynchronous calls in JavaScript.

- A Promise is an object representing the eventual completion or failure of an asynchronous operation…Essentially, `a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.`

- 什么是 Web APIs：
    1. `JavaScript executes code in a single thread, which makes it blocking. `

    2. `Web APIs are APIs that extends JavaScript functionality to perform asynchronous tasks.` For example, setTimeout is a Web API that performs some action after a given delay. 以上，setTimeout 也是 Web APIs 之一。most Web APIs are callback based. They need a callback function to notify when an asynchronous operation is done.

    3. 可以把主线程看成是一条流水线，当运行到 setTimeout 时，直接开始计时，然后把对应的 callback 放在另外一条流水线上面，`当主流水线空出来了，堆栈里面比 setTimeout callback 优先级的都执行完了，然后 setTimeout 的计时也结束了，这个 callback 就调回去主流水线开始执行。`从这个角度看应该是需要符合3个条件才能执行，所以对应的计时是不准确的。

- 为什么使用 callback？

    1. That is because a JavaScript program is single threaded and all code is executed in a sequence, not in parallel. In JavaScript this is handled by using what is called an `“asynchronous non-blocking I/O model”.` What that means is that while the execution of JavaScript is blocking, `I/O operations are not. `I/O operations can be fetching data over the internet with Ajax or over WebSocket connections, querying data from a database such as MongoDB or accessing the filesystem with the NodeJs “fs” module. All these kind of operations are done in parallel to the execution of your code and it is not JavaScript that does these operations; to put it simply, the underlying engine does it.（重要）

    2.  `asynchronous non-blocking I/O model`就是相当于另一条生产线，它里面包括堆栈，堆栈优先级还有先进先出的排队机制。For example, The underlying HTTP(s) request is an asynchronous operation and does not block the execution of the rest of the JavaScript code. The callback function is put on a sort of queue called the “event loop” until it will be executed with a result from the request.`(当 JS 执行到一些 asynchronous operation 的时候，就会转向 underlying I/O operation 运行这个函数，但主线程序会继续运行而不受打断，而对应的 callback 会被放在一个叫做 event loop 的地方。)`Callbacks are a good way to declare what will happen once an I/O operation has a result.

    3. `As you can see, “request” takes a function as its last argument. This function is not executed together with the code above. It is saved to be executed later once the underlying I/O operation of fetching data over HTTP(s) is done. The underlying HTTP(s) request is an asynchronous operation and does not block the execution of the rest of the JavaScript code. The callback function is put on a sort of queue called the “event loop” until it will be executed with a result from the request.`(这一段解释了整个运作过程)

    4. One thing to note here is the first argument in every callback function will contain an error if something went wrong, or will be empty if all went well. `This pattern is called “error first callbacks” and is very common.` It is the standard pattern for callback-based APIs in NodeJs. `This means that for every callback declared we need to check if there is an error and that just adds to the mess when dealing with nested callbacks.`

- 使用 callback 的坏处？`（这里介绍 callback hell 的内容）`

    1. But unfortunately, it becomes very difficult to handle callback when we do series of ajax calls where one call is dependent on previous call. We might encounter difficulty in maintaining multiple callback references and handling multiple success and error` conditions. 

    2. We end up with many nested callback functions that are dependent on the previous callback function. This is often referred to as a callback hell, as we end up with tons of nested callback functions that make the code quite difficult to read!

    3. A promise is an object that wraps an asynchronous operation and notifies when it’s done. This sounds exactly like callbacks, but the important differences are in the usage of Promises. `Instead of providing a callback, a promise has its own methods`（这里的意思是无论是 callback 还是 promise 的形式，目的都是为了使一连串的 asynchronous operation 串联起来，比如说将一些有延迟或者需要等候的动作分先后顺序地执行。）上面提到的事实上 promise 自带的 method 跟 callback 是差不多的。

- 为什么使用 promise ？

    1. `Promise is used to overcome issues with multiple callbacks and provide better way to manage success and error conditions.`  `Promise is an object.`

    2. `A promise is an object which has then and catch methods on it.` One of this method gets called when the promise returns a value or an error.then 和 catch 都是 promise 的 build-in method，可以把它们看成是 callback， promise 本质上是一个 object，只有 promise 才能使用 then 和 catch。

    3. It’s possible to chain events together after a failure, i.e. a catch, which is useful to accomplish new actions even after an action failed in the chain.`（这个是值得注意的一个点，catch 不一定是结束，它可以继续返回 promise，从而延长 promise 链，正如 sync 中的 if/else statement）`

    4. Promise.all() returns a single Promise that resolves when all of the promises passed as an iterable have resolved or when the iterable contains no promises. `Callbacks can’t do that.`

    5. Promises solve a fundamental flaw with the callback pyramid of doom, by catching all errors, even thrown exceptions and programming errors. This is essential for functional composition of asynchronous operations.`(简化 callback 的 “error first callbacks” ，简化了代码，同时增强代码的可支持力，最后还可以捕捉系统错误。)`

    6. Use promises whenever you are using asynchronous or blocking code.
    7. resolve maps to then and reject maps to catch for all practical purposes.
    8. Make sure to write both .catch and .then methods for all the promises. It is a good idea to make sure that you always pass Error objects when calling reject.
    9. If something needs to be done in both cases use .finally.
    10. The return type of all the methods in the Promise object, regardless of whether they are static methods or prototype methods, is again a Promise.
    11. In Promise.all, the order of the promises are maintained in the values variable, irrespective of which promise was first resolved.
    12. Promise object can be resolved or rejected only one time. We can add multiple success and error handlers on the promise object.

- promise 是怎样运作的？

    1. A promise object is created from Promise constructor/class which needs a callback function AKA executor function ( either in ES5 syntax or a fat arrow function). `This callback function receives the resolve and reject function arguments, either of which we must envoke with an optional payload.`

    2. The creation of a Promise object is done via the Promise constructor by calling “new Promise()”. It takes a function as an argument and that function gets passed `two callbacks:` one for notifying when the operation is successful (resolve) and one for notifying when the operation has failed (reject). What you pass as an argument when calling resolve will be passed to the next then() in the promise chain. The argument passed when calling reject will end up in the next catch(). `如何建造 promise`

- 关于 promise 的返回值。

    1. Instead of nesting callbacks inside callbacks inside callbacks, you chain .then() calls together making it more readable and easier to follow. `Every .then() should either return a new Promise or just a value or object which will be passed to the next .then() in the chain.` Another important thing to notice is that even though we are doing two different asynchronous requests we only have one .catch() where we handle our errors.` That’s because any error that occurs in the Promise chain will stop further execution and an error will end up in the next .catch() in the chain.`(这里提到的是返回值还有运行规律，有时候一个 catch 就足够，不过这也要从实际情况出发。)

    2. Promise handler returns a new promise ？ `（对这个说法比较疑惑,现在的认识是 promise 就是一个 object，但显示出来的是一个 promise，promise 在定义的时候就已经在运行了，使用 then 和 catch 相当于加入 callback，但是作为 handler 的 then 是否一定返回 promise 这个说法是不对的，只有在 then 内运行 “return + promise / 数值” 才能是返回 promise，也只有这样才能接着使用 下一个 then。）`可以是 一个 promise，也可以是一个数字或者其他变量，但只有是 promise 的时候才能继续使用 then 和 catch。

    3. `（除了返回带值的 promise 之外，还可以返回一个新的 promise/ 或者以返回值为参数的 promise，当这个新 promise 完成之后，就进入 then 或者 catch）`

    例子：
    ```js
    Promise.resolve( 'Fulfill DATA!' )
    .then( ( result ) => {
        console.log( '[1] then', result );

        return new Promise( resolve => {
            setTimeout( () => {
                resolve( 'Nested promise data!' );
            }, 1000 ); 
        } );
    } )
    .then( ( result ) => {
        console.log( '[2] then', result );
    } );
    ```

    4. When a promise is returned from a handler, we don’t need to handle promise rejection on it. It will be cascaded to parent until it finds the catch handler.`(这个是更高阶的设定，当上一层返回的 promise 是 reject 结果时，下一层接的接口直接是 catch。)`

    例子：(运行任何例子之前想象一下结果，以下是一个很好的学习 promise 的代码材料。)
    ```js
    Promise.resolve('Fulfill DATA!')
        .then((result) => {
            console.log('[1] then', result);

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('Nested promise error data!');
                }, 1000);
            }).then((data) => {
                return `Inner promise data: ${data}`;
            });
        })
        .then((result) => {
            console.log('[2] then', result);
        })
        .catch((error) => {
            console.log('[1] catch', error);
        });
    ```

- event loop 中的两种类型 queue

    - within the Event Loop, there are actually two types of queues: the (macro)task queue (or just called the task queue), and the microtask queue. The (macro)task queue is for (macro)tasks and the microtask queue is for microtasks.

    `(Macro)task: `setTimeout | setInterval
    `Microtask: `process.nextTick | `Promise callback` | queueMicrotask

- promise 各部分在 event loop 中的执行时机？`(call stack + event loop)`

    - So when is a then(), catch() or finally() callback executed? The event loop gives a different priority to the tasks:

    - 1. All functions in that are currently in the `call stack` get executed. When they returned a value, they get popped off the stack.
    - 2. When the call stack is empty, all queued up microtasks are popped onto the callstack one by one, and get executed! (Microtasks themselves can also return new microtasks, effectively creating an infinite microtask loop 😬)
    - 3. If both the call stack and microtask queue are empty, the event loop checks if there are tasks left on the (macro)task queue. The tasks get popped onto the callstack, executed, and popped off!

    翻译成中文，就是：
    1. 所有在 call stack 中的函数，一旦遇到关键词 return 或者其他 关键词，都会从 call stack 中撤出。
    2. 只有当 call stack 清空之后，在 `microtasks(Promise所在群组)`中的函数会优先一个一个放进 call stack 并逐个执行
    3. 只有所有 call stack 和 microtasks 都清空之后，最后 event loop 才会去查看`(macro)task queue`.

- 关于 event loop 优先级跟运作原理。（整个构造版图： call stack + event loop + asynchronous non-blocking I/O model ）

    1. `The event loop is endlessly running single-threaded loop that runs on the main JavaScript thread and listens for the different events. Its job is to accept callback functions and execute them on the main thread. `Since event loop runs on the main thread, if the main thread is busy, event loop is basically dead for that time.`(这句话又颠覆了前面的认识，这里确实是两条流水线，但是在 asynchronous non-blocking I/O model 生产线完成后，接下来的 callback 还是要返回主线执行，在这期间 callback 都被安排在 event loop，而我们的 callback 或者 promise 方案就是为了能人工编排 event loop 的输出顺序，同时也是 callback 的执行顺序。)`

    2. The macrotask queue is a queue of the callback function waiting to be executed. `The event loop pushes oldest queued callback functions (FIFO) from macrotask queue on to the main call stack one at the time where they are executed synchronously. Event loop only pushes a callback function to the stack when the stack is empty or when the main thread is not busy.`(这里解释了 event loop 的作用)

    3. `The call stack will become empty when all synchronous function calls are executed. `（先执行 sync function）

    4. then and catch as well as finally methods of a promise register the callback functions passed to them and these callbacks are provided to the event loop when the promise is resolved or rejected. These callbacks are added to the microtask queue which has `higher` priority than macrotask queue.` Hence event loop will prefer to execute them first.` `（then 和 catch 都属于 callback， 都会被放在 queue 中，当栈空了之后才会调用。）`

- 使用 promise 常有误区。

    1. One important side note here is that “someAsyncOperation(someParams)” is not a Promise itself but a function that returns a Promise.`(这个纠正了我刚开始时的认识)`

    2. `just like with callback based APIs, this is still asynchronous operations.` The code that is executed when the request has finished — that is, the subsequent .then() calls — `is put on the event loop just like a callback function would be. This means you cannot access any variables passed to or declared in the Promise chain outside the Promise.` The same goes for errors thrown in the Promise chain. You must also have at least one .catch() at the end of your Promise chain for you to be able to handle errors that occur. If you do not have a .catch(), any errors will silently pass and fade away and you will have no idea why your Promise does not behave as expected.`(这个纠正了我刚开始时的认识，因为 asynchronous operations 的 call back 都是在 sync operation 全部结束后才运行的，所以对 sync 不能传输任何价值变量。)`

    3. 在 promise 定义的 resolve 函数包含的结果可以用 promise object 自带的 then 方法引导出来。但还是那一句，引导出来的值都只能在 promise 链内使用。

    4. `这里有一个很重要的认识，promise 就是一个 object，一个函数返回 promise，外部函数是无法使用 promise 里面生成的数据的，所以如果要使用 promise 链中的数据，只能在 .then 中运用。`

    6. `一个比较隐蔽的情况是，在定义 resolve 和 reject 时，对接数据的是 then 和 catch 内建函数，具体后面详细解释。`

    7. As stated above, callbacks are not interchangeable with Promises. `This means that callback-based APIs cannot be used as Promises. `（无法直接嫁接使用，但可以尝试从一套方案转换到另一套方案。）

    8. But an important thing to remember about promises is that even when we are calling resolve or reject immediately, i.e., `without an async function, its callback handlers will be called only when the main JavaScript execution has done all pending work. That means, once the stack is empty, our promise handlers will get executed. `(这里是关于 then 和 catch 的执行时机的进一步说明，看上去 then 是马上执行，实际上是需要一定的条件才调用的，因为它们依然是在 event loop 里面的 callback。）

    9. Another important thing to remember is, catch handler will be invoked by the promise not only when we reject the promise `but even when JavaScript encounter runtime error in the executor function of the promise.`（这里讨论 catch 也可以自动捕捉系统错误。）

    10. Both catch and finally handlers are optional. But it is not safe to eliminate catch handler completely. `This is because even though we are calling resolve from inside the promise executor function, there might be hidden bugs which throw the runtime error.` Since we haven’t registered a callback function to handle the promise failure in catch handler method, `the error will be thrown in our main execution context which might crash our program.`

    11. Even though promises are cool, there are certain limitations with them. `For example, they are not cancellable. Once a promise is created, it can not be terminated. This means, its handlers will invoke sometime in the future, no matter what.`（安全性问题。）

    12. Another thing about promises is, they are not replayable or retriable. Once a promise is resolved and handled, `you can not invoke it again to do the same task. This is one of the frustrating drawbacks of promise.`

- 如何使用 async 创造 async function ？

    1. We can create async functions that implicitly return a promise. `这是个很重要的认识，所有用 async 定义的函数都是返回一个 promise`

- 使用 async 的好处和注意事项：
    
    1. With the await keyword, `we can suspend the asynchronous function while we wait for the awaited value return a resolved promise. If we want to get the value of this resolved promise, like we previously did with the then() callback, we can assign variables to the awaited promise value!` （这个过程就是 promise 完成了 resolve 然后 调用 then 的过程压缩了，只不过这里更直观更好处理，可以把值放在自定义变量上。）

    2. `The async function declaration defines an asynchronous function, which returns an AsyncFunction object. An asynchronous function is a function which operates asynchronously via the event loop, using an implicit Promise to return its result. But the syntax and structure of your code using async functions is much more like using standard synchronous functions`（async function 的定义，就是内部运行 promise 的功能集合，同时 在 await 开始，之后的代码都进入了 promise链，这个人是很重要。）

    4. `Promises and async/await accomplish the same thing. They make retrieving and handling asynchronous data easier. They eliminate the need for callbacks, they simplify error handling, they cut down on extraneous code, they make waiting for multiple concurrent calls to return easy, and they make adding additional code in between calls a snap.`（详细解释了好处。）

    5. A function call can only have the await keyword `if the function being called is “awaitable”.`shi A function is “awaitable” if it has the async keyword or if it returns a Promise. Remember when I said that callbacks and Promises are not interchangeable and you have to wrap a callback based function inside a Promise and return that Promise? Well, functions with the async keyword are interchangeable with functions that returns Promises which is why I stated that a function that returns a Promise is “awaitable”.`这个解释很好`

    7. async functions return a promise.
    8. async functions use an implicit Promise to return results. Even if you don’t return a promise explicitly, the async function makes sure that your code is passed through a promise.
    10. There can be multiple await statements within a single async function.
    11. When using async await, make sure you use try catch for error handling.
    12. Be extra careful when using await within loops and iterators. You might fall into the trap of writing sequentially-executing code when it could have been easily done in parallel.
    13. await is always for a single Promise.
    14. Promise creation starts the execution of asynchronous functionality.
    15. await only blocks the code execution within the async function. It only makes sure that the next line is executed when the promise resolves. So, if an asynchronous activity has already started, await will not have any effect on it.

- async 定义函数的返回值是什么？

    1. One major advantage that async/await syntax `brings is the ability to create async generators. By making generator function async,` we can use `await` keyword with each yield statement which returns a value when the corresponding promise is resolved.`（强化 await 开始 promise 链的概念，同时 await 也解决了把 promise 分段的功能。）`

    2. Is async/await blocks the main thread？

    - From await syntax keyword looks like that it blocks the execution of the thread until the promise it is awaiting on resolves. `But that’s is not the case.` The while async/await pattern is still based on classical Promise syntax.`（强化 从第一个 await 就开始 promise 链的概念。)` The await keyword is like a then callback that wraps all the statements below it.`(继续强化第三点观点)`

    3. Async/await may make your asynchronous calls look more synchronous but it is still executed the same way as if it were using a callback or promise based API. `The asynchronous I/O operations will still be processed in parallel and the code handling the responses in the async functions will not be executed until that asynchronous operation has a result.` Also, `even though you are using async/await you have to sooner or later resolve it as a Promise in the top level of your program.` This is because async and await are just syntactical sugar for automatically creating, returning and resolving Promises.

- promise 还是 async/await？ (关键判断 ：parallel --- 平行)

    1. The async function returns a promise. The converse is also true. `Every function that returns a promise can be considered as async function.`(都会在 sync 之后执行。)
    2. await blocks the execution of the code within the async function in which it is located.
    3. If the output of function2 is dependent on the output of function1, I use await.
    4. If two functions can be run in parallel, create two different async functions and then run them in parallel.
    5. To run promises in parallel, create an array of promises and then use Promise.all(promisesArray).
    6. `Every time you use await remember that you are writing blocking code. Over time we tend to neglect this.`
    8. Instead of creating huge async functions with many await asyncFunction() in it, it is better to create smaller async functions. This way, we will be aware of not writing too much blocking code.
    9. Another advantage of using smaller async functions is that you force yourself to think of which async functions can be run in parallel.

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

    版本三：`（ promise + return promise chain）`
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

    3. `Promise 的定义方式，注意 promise 定义的时候就已经在执行 setTimeout 的计时,而不是使用 .then 时才开始`

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

    4. “promisification”， 例子如下：

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

    - 备注：直接定义 Promise 会运行里面的代码，这种用函数包装形式就不会。
    - Note that it is within the function being passed to the Promise constructor that we start the asynchronous operation. That function is then responsible for calling resolve(success) when it’s done or reject(error) if there are errors.`（high-order function）`

    - The process of wrapping a callback based asynchronous function inside a Promise and return that promise instead is called “promisification”. We are “promisifying” a callback-based function. There are lots of modules that let you do this in a nice way but since version 8 NodeJs has a built in a helper called “util.promisify” for doing exactly that.`(专业名词)`

    5. A、event loop 里面的执行顺序：

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

    - 作为对比的代码：
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

    B、event loop 里面的执行顺序：
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
    4.promiseA ---> 同时把 console.log('PromiseA success!'); 放进 queue
    5.console.log(`I am sync job 2!`);
    6.console.log(`I am sync job 3!`);

    queue --->
    7. console.log('PromiseA success!');
    8. console.log(`setTimeout callback`)
    console.log('Timeout!'); >>>`(macro)task queue`
    优先调用 queue 中的 promise callback
    最后调用 另外一个 queue 中的 setTimeout 的 callback。
    */
    ```

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

    13. 关于callback hell 的代码：
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

    改成：

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

    ```js
    result of a()
    a() is done!
    result of b()
    b() is done!
    result of c()
    c() is done!
    ```

    - 上面的例子说明把 sync 放进 async 的 callback 里面可以保证 async 一些动作先于 sync。

    - 进一步改进的版本： Callback hell

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