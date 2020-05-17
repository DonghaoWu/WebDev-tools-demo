# Web development tools (Part 8)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Front-end`(Async - Research "doc")

### `Summary`: In this documentation, we deep dive in JS async, documentation part.

### `Check Dependencies & Tools:`

- 

------------------------------------------------------------

#### `本章背景：`
- 

### <span id="8.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [8.1 Terminologies.](#8.1)
- [8.2 My understanding about async.](#8.2)
- [8.3 About callback.](#8.3)
- [8.4 About Promise.](#8.4)
- [8.5 About event loop.](#8.5)
- [8.6 Things you should know before using Promise.](#8.6)
- [8.7 About async/await.](#8.7)
- [8.8 More about async function.](#8.8)

------------------------------------------------------------

### <span id="8.1">`Step1: Terminologies.`</span>

- #### Click here: [BACK TO CONTENT](#8.0)

```diff
+ Ajax
+ async programming
    - AJAX Call
    - setTimeout or setInterval
    - Reading a file
    - Events
+ async activity
+ Web APIs
+ promisification
+ AJAX
    - which stands for Asynchronous JavaScript And XML and callbacks were an OG way of handling asynchronous calls in JavaScript.

+ Promise
    1. A Promise is an object representing the eventual completion or failure of an asynchronous operation.
    2. Essentially, `a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.`
```

#### `Comment:`
1. 

### <span id="8.2">`Step2: My understanding about async.`</span>

- #### Click here: [BACK TO CONTENT](#8.0)

    1. `JavaScript executes code in a single thread, which makes it blocking. `

    2. `Web APIs are APIs that extends JavaScript functionality to perform asynchronous tasks.` For example, setTimeout is a Web API that performs some action after a given delay. 以上，setTimeout 也是 Web APIs 之一。most Web APIs are callback based. They need a callback function to notify when an asynchronous operation is done.

    3. 可以把主线程看成是一条流水线，当运行到 setTimeout 时，直接开始计时，然后把对应的 callback 放在 event loop，`当主流水线空出来了，堆栈里面比 setTimeout callback 优先级的都执行完了，然后 setTimeout 的计时也结束了，这个 callback 就调回去主流水线开始执行。`从这个角度看应该是需要符合3个条件才能执行，所以对应的计时是不准确的。

    4. 当你在代码中使用 async operation 时，你要想好这个动作是有延迟的，对当前的流程没有提供值的能力，且工作是在另外一条流水线上执行。

    5. 很重要的认识是，event loop 里面的 callback 一定是在主流水线 sync 函数完成之后才执行的，至于如果有多个并行的 async 如何决定它们的顺序这是后面补充更新。

    6. 整个构造版图： `call stack + event loop + asynchronous non-blocking I/O model`

    7. .then 和 .catch 都属于 promise callback，都会放在 microtask queue 中, promise callback 放进 event loop 的时机是在 `promise 的 resolve 或者 reject 的时候。`

    8. `这里有一个很重要的认识，promise 就是一个 object，一个函数返回 promise，外部函数是无法使用 promise 里面生成的数据的，所以如果要使用 promise 链中的数据，只能在 .then 中运用。`

    9. 关于 then 和 catch 的执行时机的进一步说明，看上去 then 是马上执行，实际上是需要一定的条件才调用的，因为它们依然是在 event loop 里面的 callback。

    10. Async/await may make your asynchronous calls look more synchronous but it is still executed the same way as if it were using a callback or promise based API. `The asynchronous I/O operations will still be processed in parallel and the code handling the responses in the async functions will not be executed until that asynchronous operation has a result.` Also, `even though you are using async/await you have to sooner or later resolve it as a Promise in the top level of your program.` This is because async and await are just syntactical sugar for automatically creating, returning and resolving Promises.(这个解释很全面。)

#### `Comment:`
1. 

### <span id="8.3">`Step3: About callback.`</span>

- #### Click here: [BACK TO CONTENT](#8.0)

    1. How does callback work with 'asynchronous non-blocking I/O model'?
        1. That is because a JavaScript program is single threaded and all code is executed in a sequence, not in parallel. In JavaScript this is handled by using what is called an `“asynchronous non-blocking I/O model”.` What that means is that while the execution of JavaScript is blocking, `I/O operations are not. `I/O operations can be fetching data over the internet with Ajax or over WebSocket connections, querying data from a database such as MongoDB or accessing the filesystem with the NodeJs “fs” module. All these kind of operations are done in parallel to the execution of your code and it is not JavaScript that does these operations; to put it simply, the underlying engine does it.`（介绍 asynchronous non-blocking I/O model ）`

        2. `asynchronous non-blocking I/O model`就是相当于另一条生产线，另外 event loop 不属于这里面。For example, The underlying HTTP(s) request is an asynchronous operation and does not block the execution of the rest of the JavaScript code. The callback function is put on a sort of queue called the “event loop” until it will be executed with a result from the request.Callbacks are a good way to declare what will happen once an I/O operation has a result.`(当 JS 执行到一些 asynchronous operation 的时候，就会转向 underlying I/O operation 运行这个函数，但主线程序会继续运行而不受打断，而对应的 callback 会被放在一个叫做 event loop 的地方。)`

        3. `As you can see, “request” takes a function as its last argument. This function is not executed together with the code above. It is saved to be executed later once the underlying I/O operation of fetching data over HTTP(s) is done. The underlying HTTP(s) request is an asynchronous operation and does not block the execution of the rest of the JavaScript code. The callback function is put on a sort of queue called the “event loop” until it will be executed with a result from the request.`(这一段解释了整个运作过程，request 在另外的生产线执行，不打断当前生产线，对应的 callback 就暂时放在 event loop 等候返回 call stack 执行。)

    2. What is the cons about callback?
        1. But unfortunately, it becomes very difficult to handle callback when we do series of ajax calls where one call is dependent on previous call. We might encounter difficulty in maintaining multiple callback references and handling multiple success and error` conditions. 

        2. We end up with many nested callback functions that are dependent on the previous callback function. This is often referred to as a callback hell, as we end up with tons of nested callback functions that make the code quite difficult to read!

        3. One thing to note here is the first argument in every callback function will contain an error if something went wrong, or will be empty if all went well. `This pattern is called “error first callbacks” and is very common.` It is the standard pattern for callback-based APIs in NodeJs. `This means that for every callback declared we need to check if there is an error and that just adds to the mess when dealing with nested callbacks.`

#### `Comment:`
1. 

### <span id="8.4">`Step4: About Promise.`</span>

- #### Click here: [BACK TO CONTENT](#8.0)

    1. Why Promise?
        1. A promise is an `object` that wraps an asynchronous operation and notifies when it’s done. This sounds exactly like callbacks, but the important differences are in the usage of Promises. `Instead of providing a callback, a promise has its own methods`（这里的意思是无论是 callback 还是 promise 的形式，目的都是为了使一连串的 asynchronous operation 串联起来，比如说将一些有延迟或者需要等候的动作分先后顺序地执行。）上面提到的事实上 promise 自带的 method 跟 callback 是差不多的。

        2. Promises solve a fundamental flaw with the callback pyramid of doom, by catching all errors, even thrown exceptions and programming errors. This is essential for functional composition of asynchronous operations.`(简化 callback 的 “error first callbacks” ，简化了代码，同时增强代码的可支持力，最后还可以捕捉系统错误。)`

        3. `A promise is an object which has then and catch methods on it.` One of this method gets called when the promise returns a value or an error.`(then 和 catch 都是 promise 的 build-in method，可以把它们看成是 callback， promise 本质上是一个 object，只有 promise 才能使用 then 和 catch。)`

        4. It’s possible to chain events together after a failure, i.e. a catch, which is useful to accomplish new actions even after an action failed in the chain.`（这个是值得注意的一个点，catch 不一定是结束，它可以继续返回 promise，从而延长 promise 链，正如 sync 中的 if/else statement）`

        5. Promise.all() returns a single Promise that resolves when all of the promises passed as an iterable have resolved or when the iterable contains no promises. `Callbacks can’t do that.`

        6. In Promise.all, the order of the promises are maintained in the values variable, irrespective of which promise was first resolved.

        7. resolve maps to then and reject maps to catch for all practical purposes.
        8. Make sure to write both .catch and .then methods for all the promises. It is a good idea to make sure that you always pass Error objects when calling reject.
        9. If something needs to be done in both cases use .finally.
        10. The return type of all the methods`(resolve() & reject())` in the Promise object, regardless of whether they are static methods or prototype methods, is again a Promise.

        11. Promise object can be resolved or rejected only one time. We can add multiple success and error handlers on the promise object.
        12. Use promises whenever you are using asynchronous or blocking code.

    2. How does promise work?
        1. The creation of a Promise object is done via the Promise constructor by calling “new Promise()”. It takes a function as an argument and that function gets passed `two callbacks:` one for notifying when the operation is successful (resolve) and one for notifying when the operation has failed (reject). What you pass as an argument when calling resolve will be passed to the next then() in the promise chain. The argument passed when calling reject will end up in the next catch(). `如何建造 promise，还有内外接口设定`

    3. What does a promise return?
        1. Instead of nesting callbacks inside callbacks inside callbacks, you chain .then() calls together making it more readable and easier to follow. `Every .then() should either return a new Promise or just a value or object which will be passed to the next .then() in the chain.` Another important thing to notice is that even though we are doing two different asynchronous requests we only have one .catch() where we handle our errors.` That’s because any error that occurs in the Promise chain will stop further execution and an error will end up in the next .catch() in the chain.`(这里提到的是返回值还有运行规律，有时候一个 catch 就足够，不过这也要从实际情况出发。)

        2. Promise handler returns a new promise ？ `（promise定义时就返回一个 promise，使用 then 和 catch 相当于加入 callback，但是作为 handler 的 then 或者 catch 不一定返回 promise，只有在 then 内运行 “return + promise” 才能是返回 promise，只有这样才能接着使用下一个 then 或 catch。）`handler 返回的可以是 一个 promise，也可以是一个变量。

        3. `（除了返回带值的 promise 之外，还可以返回一个新的 promise/ 或者以返回值为参数的 promise，当这个新 promise 完成之后，就进入 then 或者 catch.）`

        - 例子：
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

        - 例子：(运行任何例子之前预测一下结果，以下是一个很好的学习 promise 的代码材料。)
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

#### `Comment:`
1. 

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