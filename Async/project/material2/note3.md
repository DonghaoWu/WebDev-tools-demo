专业名词：

- Ajax
- async programming
    - AJAX Call
    - setTimeout or setInterval
    - Reading a file
    - Events
- async activity
- Web APIs

- AJAX, which stands for Asynchronous JavaScript And XML and callbacks were an OG way of handling asynchronous calls in JavaScript. What it boils down to, is when one function is meant to be executed after another function has finished executing — hence the name ‘call back’.

- A Promise is an object representing the eventual completion or failure of an asynchronous operation…Essentially, `a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.`

- 什么是 Web APIs：

    1. `JavaScript executes code in a single thread, which makes it blocking. `

    2. `Web APIs are APIs that extends JavaScript functionality to perform asynchronous tasks.` For example, setTimeout is a Web API that performs some action after a given delay. To understand how Web APIs work, or least how setTimeout works, you should check out my article on the event loop.

    3. 以上，setTimeout 也是 Web APIs 之一。

    4. Basically, setTimeout(callback, delay) function takes a callback and stores it temporarily. `It waits for delay given in milliseconds and then pushes the callback function in the stack once the stack it is empty.` Then the callback function gets executed. This is basically how all Web APIs work.`(这里的意思是等到时间了，同时还有堆栈空了，这两个条件符合之后才会执行对应的 callback)。` 这里要理解计时是什么时候开始的。

    5. most Web APIs are callback based. They need a callback function to notify when an asynchronous operation is done.

- 为什么使用 callback？

    1. That is because a JavaScript program is single threaded and all code is executed in a sequence, not in parallel. In JavaScript this is handled by using what is called an `“asynchronous non-blocking I/O model”.` What that means is that while the execution of JavaScript is blocking, `I/O operations are not. `I/O operations can be fetching data over the internet with Ajax or over WebSocket connections, querying data from a database such as MongoDB or accessing the filesystem with the NodeJs “fs” module. All these kind of operations are done in parallel to the execution of your code and it is not JavaScript that does these operations; to put it simply, the underlying engine does it.

    2. `As you can see, “request” takes a function as its last argument. This function is not executed together with the code above. It is saved to be executed later once the underlying I/O operation of fetching data over HTTP(s) is done. The underlying HTTP(s) request is an asynchronous operation and does not block the execution of the rest of the JavaScript code. The callback function is put on a sort of queue called the “event loop” until it will be executed with a result from the request.`(这一段解释了整个运作过程)

    3. Callbacks are a good way to declare what will happen once an I/O operation has a result.

    4. When you have a callback in a callback like this, the code tends to be a bit less readable and a bit messy. In some cases you may have a callback in a callback in a callback or even a callback in a callback in a callback in a callback. You get the point: it gets messy.

    5. One thing to note here is the first argument in every callback function will contain an error if something went wrong, or will be empty if all went well. `This pattern is called “error first callbacks” and is very common.` It is the standard pattern for callback-based APIs in NodeJs. `This means that for every callback declared we need to check if there is an error and that just adds to the mess when dealing with nested callbacks.`

    6. This is the anti-pattern that has been named “callback hell”.

    7. Callbacks are great way to separate the core logic of ajax with the rest of the application.

- 使用 callback 的坏处？`（这里介绍 callback hell 的内容）`

    1. But unfortunately, it becomes very difficult to handle callback when we do series of ajax calls where one call is dependent on previous call. We might encounter difficulty in maintaining multiple callback references and handling multiple success and error` conditions. Promise is a better way to manage multiple ajax calls. Let’s explore Promise next.

    2. Callback is easy to start with but certainly not the right direction. If you are new to javascript, you should know callback but should use promise.

    3. We end up with many nested callback functions that are dependent on the previous callback function. This is often referred to as a callback hell, as we end up with tons of nested callback functions that make the code quite difficult to read!

    4. A promise is an object that wraps an asynchronous operation and notifies when it’s done. This sounds exactly like callbacks, but the important differences are in the usage of Promises. `Instead of providing a callback, a promise has its own methods` which you call to tell the promise what will happen when it is successful or when it fails. The methods a promise provides are “then(…)” for when a successful result is available and “catch(…)” for when something went wrong.

- 为什么使用 promise ？

    1. `Promise is used to overcome issues with multiple callbacks and provide better way to manage success and error conditions.` Promise looks little complex in the beginning but its very simple and effective to deal with. `Promise is an object which is returned by the async function like ajax.`

    2. Promises make our job a little easier when it comes to writing complicated asynchronous programs. `A promise is an object which has then and catch methods on it.` One of this method gets called when the promise returns a value or an error.

    3. Callbacks added with then() even after the success or failure of the asynchronous operation, will be called, as above.

    4. Multiple callbacks may be added by calling then() several times. Each callback is executed one after another, in the order in which they were inserted (this is the chaining I mentioned earlier).

    5. It’s possible to chain events together after a failure, i.e. a catch, which is useful to accomplish new actions even after an action failed in the chain.

    6. Promise.all() returns a single Promise that resolves when all of the promises passed as an iterable have resolved or when the iterable contains no promises. Callbacks can’t do that.

    7. Promises solve a fundamental flaw with the callback pyramid of doom, by catching all errors, even thrown exceptions and programming errors. This is essential for functional composition of asynchronous operations.

    8. Use promises whenever you are using asynchronous or blocking code.
    9. resolve maps to then and reject maps to catch for all practical purposes.
    10. Make sure to write both .catch and .then methods for all the promises.
    11. If something needs to be done in both cases use .finally.
    12. We only get one shot at mutating each promise.
    13. We can add multiple handlers to a single promise.
    14. The return type of all the methods in the Promise object, regardless of whether they are static methods or prototype methods, is again a Promise.
    15. In Promise.all, the order of the promises are maintained in the values variable, irrespective of which promise was first resolved.

- promise 是怎样运作的？

    1. A promise object is created from Promise constructor/class which needs a callback function AKA executor function ( either in ES5 syntax or a fat arrow function). `This callback function receives the resolve and reject function arguments, either of which we must envoke with an optional payload.`

    2. 在这里要标注的是 then 和 catch 都是 promise 的 build-in method， promise 本质上是一个 object。

    3. Promise object can be resolved or rejected only one time. We can add multiple success and error handlers on the promise object.

    4. The creation of a Promise object is done via the Promise constructor by calling “new Promise()”. It takes a function as an argument and that function gets passed two callbacks: one for notifying when the operation is successful (resolve) and one for notifying when the operation has failed (reject). What you pass as an argument when calling resolve will be passed to the next then() in the promise chain. The argument passed when calling reject will end up in the next catch(). It is a good idea to make sure that you always pass Error objects when calling reject.`如何建造 promise`

- 关于 promise 的返回值。

    1. Instead of nesting callbacks inside callbacks inside callbacks, you chain .then() calls together making it more readable and easier to follow. `Every .then() should either return a new Promise or just a value or object which will be passed to the next .then() in the chain.` Another important thing to notice is that even though we are doing two different asynchronous requests we only have one .catch() where we handle our errors.` That’s because any error that occurs in the Promise chain will stop further execution and an error will end up in the next .catch() in the chain.`(提到了返回值)

    2. Promise handler returns a new promise ？ `（对这个说法比较疑惑,现在的认识是 promise 就是一个 object，但显示出来的是一个 promise，promise 在定义的时候就已经在运行了，使用 then 和 catch 相当于加入 callback，但是作为 handler 的 then 是否一定返回 promise 这个说法是不对的，只有在 then 内运行 “return + promise / 数值” 才能是返回 promise，也只有这样才能接着使用 下一个 then。）`

    3. Another cool thing is, we can return a promise from within these handlers instead of plain values. What this will do is, instead of returning a fulfilled promise with the returned value as the payload, we get the returned promise.`（除了返回带 值的 promise 之外，还可以返回一个新的 promise，当这个 新 promise 完成之后，就进入 then 或者 catch）`----（这里就是对上一个观点的补充。）
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

    例子：
    ```js
    Promise.resolve( 'Fulfill DATA!' )
    .then( ( result ) => {
        console.log( '[1] then', result );

        return new Promise( ( resolve, reject ) => {
            setTimeout( () => {
                reject( 'Nested promise error data!' );
            }, 1000 );
        } ).then( ( data ) => {
            return `Inner promise data: ${ data }`;
        } );
    } )
    .then( ( result ) => {
        console.log( '[2] then', result );
    } )
    .catch( ( error ) => {
        console.log( '[1] catch', error ); 
    } );
    ```

- event loop 中的两种类型 queue

    - within the Event Loop, there are actually two types of queues: the (macro)task queue (or just called the task queue), and the microtask queue. The (macro)task queue is for (macro)tasks and the microtask queue is for microtasks.

    - So what’s a (macro)task and what’s a microtask? Although there are a few more than I’ll cover here, the most common are shown in the table below!
    `(Macro)task: `setTimeout | setInterval
    `Microtask: `process.nextTick | `Promise callback` | queueMicrotask

- promise 各部分在 event loop 中的执行时机？

    - So when is a then(), catch() or finally() callback executed? The event loop gives a different priority to the tasks:

    - 1. All functions in that are currently in the call stack get executed. When they returned a value, they get popped off the stack.
    - 2. When the call stack is empty, all queued up microtasks are popped onto the callstack one by one, and get executed! (Microtasks themselves can also return new microtasks, effectively creating an infinite microtask loop 😬)
    - 3. If both the call stack and microtask queue are empty, the event loop checks if there are tasks left on the (macro)task queue. The tasks get popped onto the callstack, executed, and popped off!

    翻译成中文，就是：
    1. 所有在 call stack 中的函数，一旦遇到关键词 return 或者其他 关键词，都会从 call stack 中撤出。
    2. 只有当 call stack 清空之后，在 `microtasks(Promise所在群组)`中的函数会优先一个一个放进 call stack 并逐个执行
    3. 只有所有 call stack 和 microtasks 都清空之后，最后 event loop 才会去查看`(macro)task queue`.

- 关于 event loop。

    1. `The event loop is endlessly running single-threaded loop that runs on the main JavaScript thread and listens for the different events. Its job is to accept callback functions and execute them on the main thread. `Since event loop runs on the main thread, if the main thread is busy, event loop is basically dead for that time.

    2. The macrotask queue is a queue of the callback function waiting to be executed. `The event loop pushes oldest queued callback functions (FIFO) from macrotask queue on to the main call stack one at the time where they are executed synchronously. Event loop only pushes a callback function to the stack when the stack is empty or when the main thread is not busy.`(这里解释了 event loop 的作用)

    3. The stack will become empty when all synchronous function calls are executed. `This is why console.log statements outside our functions are executed first because they were pushed on the stack before console.log statements inside the callback functions.`（先执行 sync function）

    4. This is why all the console.log statements outside the functions are getting printed in a synchronous manner while console.log statements inside functions are getting called in order of their time delay.

    5. then and catch as well as finally methods of a promise register the callback functions passed to them and these callbacks are provided to the event loop when the promise is resolved or rejected. These callbacks are added to the microtask queue which has higher priority than macrotask queue.` Hence event loop will prefer to execute them first.`（then 和 catch 都属于 callback， 都会被放在 queue 中，当栈空了之后才会调用。）

- 使用 promise 常有误区。

    1. One important side note here is that “someAsyncOperation(someParams)” is not a Promise itself but a function that returns a Promise.`(这个纠正了我刚开始时的认识)`

    2. `just like with callback based APIs, this is still asynchronous operations.` The code that is executed when the request has finished — that is, the subsequent .then() calls — `is put on the event loop just like a callback function would be. This means you cannot access any variables passed to or declared in the Promise chain outside the Promise.` The same goes for errors thrown in the Promise chain. You must also have at least one .catch() at the end of your Promise chain for you to be able to handle errors that occur. If you do not have a .catch(), any errors will silently pass and fade away and you will have no idea why your Promise does not behave as expected.`(这个纠正了我刚开始时的认识)`

    3. 在 promise 定义的 resolve 函数包含的结果可以用 promise object 自带的 then 方法引导出来。但还是那一句，引导出来的值都只能在 promise 链内使用。

    4. `这里有一个很重要的认识，promise 就是一个 object，一个函数返回 promise，外部函数是无法使用 promise 里面生成的数据的，需要等整个 promise 完结之后才能使用，但这个时候原来设计的需要使用这个数据的同步函数已经在异步函数之前结束了。所以如果要使用 promise 链中的数据，只能在 .then 中运用。`

    5. it is standard practice to use the catch method handler to handle promise rejection instead of using then method. If you use both catch and then method to handle promise rejection, catch handler will be ignored.

    6. `一个比较隐蔽的情况是，在定义 resolve 和 reject 时，对接的是 then 和 catch 内建函数，具体后面详细解释。`

    7. As stated above, callbacks are not interchangeable with Promises. `This means that callback-based APIs cannot be used as Promises. `The main difference with callback-based APIs is it does not return a value, it just executes the callback with the result. A Promise-based API, on the other hand, immediately returns a Promise that wraps the asynchronous operation, and then the caller uses the returned Promise object and calls .then() and .catch() on it to declare what will happen when the operations has finished. `（这里说出了 callback 和 promise 一个很大的区别点。）`-- callback 可外用？

    8. But an important thing to remember about promises is that even when we are calling resolve or reject immediately, i.e., `without an async function, its callback handlers will be called only when the main JavaScript execution has done all pending work. That means, once the stack is empty, our promise handlers will get executed. Let’s see that in action.`(这里是关于 then 和 catch 的执行时机的进一步说明，看上去 then 是马上执行，实际上是需要一定的条件才调用的）。

    9. Another important thing to remember is, catch handler will be invoked by the promise not only when we reject the promise `but even when JavaScript encounter runtime error in the executor function of the promise.`（这里讨论的时 catch 也可以自动捕捉系统错误。）

    10. Both catch and finally handlers are optional. But it is not safe to eliminate catch handler completely. `This is because even though we are calling resolve from inside the promise executor function, there might be hidden bugs which throw the runtime error.`

    11. Since we haven’t registered a callback function to handle the promise failure in catch handler method, `the error will be thrown in our main execution context which might crash our program.`

    12. Even though promises are cool, there are certain limitations with them. `For example, they are not cancellable. Once a promise is created, it can not be terminated. This means, its handlers will invoke sometime in the future, no matter what.`

    13. Another thing about promises is, they are not replayable or retriable. Once a promise is resolved and handled, `you can not invoke it again to do the same task. This is one of the frustrating drawbacks of promise.`

- 如何使用 async 创造 async function ？

    1. With the introduction of the async and await keywords, we can create async functions that implicitly return a promise. `这是个很重要的认识，所有用 async 定义的函数都是返回一个 promise`

- 使用 async 的好处：
    
    1. Although the fact that async functions implicitly return promises is pretty great, the real power of async functions can be seen when using the await keyword! With the await keyword, `we can suspend the asynchronous function while we wait for the awaited value return a resolved promise. If we want to get the value of this resolved promise, like we previously did with the then() callback, we can assign variables to the awaited promise value!` （这个过程就是 promise 完成了 resolve 然后 调用 then 的过程压缩了，只不过这里更好处理，可以把值放在 自定义变量上。）

    2. `The async function declaration defines an asynchronous function, which returns an AsyncFunction object. An asynchronous function is a function which operates asynchronously via the event loop, using an implicit Promise to return its result. But the syntax and structure of your code using async functions is much more like using standard synchronous functions`

    3. `An async function can contain an await expression that pauses the execution of the async function and waits for the passed Promise's resolution, and then resumes the asyncfunction's execution and returns the resolved value.`

    4. `Promises and async/await accomplish the same thing. They make retrieving and handling asynchronous data easier. They eliminate the need for callbacks, they simplify error handling, they cut down on extraneous code, they make waiting for multiple concurrent calls to return easy, and they make adding additional code in between calls a snap.`

    5. `Async/Await is the next step in the evolution of handling asynchronous operations in JavaScript. It gives you two new keywords to use in your code: “async” and “await”.` Async is for declaring that a function will handle asynchronous operations and `await is used to declare that we want to “await” the result of an asynchronous operation inside a function that has the async keyword.`

    6. A function call can only have the await keyword `if the function being called is “awaitable”.`shi A function is “awaitable” if it has the async keyword or if it returns a Promise. Remember when I said that callbacks and Promises are not interchangeable and you have to wrap a callback based function inside a Promise and return that Promise? Well, functions with the async keyword are interchangeable with functions that returns Promises which is why I stated that a function that returns a Promise is “awaitable”.`这个解释很好`

    7. async functions return a promise.
    8. async functions use an implicit Promise to return results. Even if you don’t return a promise explicitly, the async function makes sure that your code is passed through a promise.
    9. await blocks the code execution within the async function, of which it (await statement) is a part.
    10. There can be multiple await statements within a single async function.
    11. When using async await, make sure you use try catch for error handling.
    12. Be extra careful when using await within loops and iterators. You might fall into the trap of writing sequentially-executing code when it could have been easily done in parallel.
    13. await is always for a single Promise.
    14. Promise creation starts the execution of asynchronous functionality.
    15. await only blocks the code execution within the async function. It only makes sure that the next line is executed when the promise resolves. So, if an asynchronous activity has already started, await will not have any effect on it.

- async 定义函数的返回值是什么？

    1. We can also return a new promise from inside async function.`(这说明 async 定义的返回值就是 promise， 此外 async 里面放什么元素在之前也有讨论。)`

    2. `You can ignore promise handlers on the promise returned by async function call as long as it doesn’t return any value or a promise. This pattern is very common nowadays to completely get rid of promise handlers.`(需要更清晰的指引去把 promise 与 async 之间转化)。

    3. One major advantage that async/await syntax `brings is the ability to create async generators. By making generator function async,` we can use `await` keyword with each yield statement which returns a value when the corresponding promise is resolved.`（强化 await 开始 promise 链的概念，同时 await 也解决了把 promise 分段的功能。）`

    4. Is async/await blocks the main thread？

    - From await syntax keyword looks like that it blocks the execution of the thread until the promise it is awaiting on resolves. `But that’s is not the case.` The while async/await pattern is still based on classical Promise syntax.

    - This answer on StackOverflow explains how async/await syntax works behind the scene. In a nutshell, `async function is more like your promise executor function which runs synchronously.` The await keyword is like a then callback that wraps all the statements below it.`(继续强化第三点观点)`

    5. Async/await may make your asynchronous calls look more synchronous but it is still executed the same way as if it were using a callback or promise based API. `The asynchronous I/O operations will still be processed in parallel and the code handling the responses in the async functions will not be executed until that asynchronous operation has a result.` Also, `even though you are using async/await you have to sooner or later resolve it as a Promise in the top level of your program.` This is because async and await are just syntactical sugar for automatically creating, returning and resolving Promises.

- promise 还是 async/await？

    1. The async function returns a promise. The converse is also true. Every function that returns a promise can be considered as async function.
    2. await is used for calling an async function and waits for it to resolve or reject.
    3. await blocks the execution of the code within the async function in which it is located.
    4. If the output of function2 is dependent on the output of function1, I use await.
    5. If two functions can be run in parallel, create two different async functions and then run them in parallel.
    6. To run promises in parallel, create an array of promises and then use Promise.all(promisesArray).
    7. Every time you use await remember that you are writing blocking code. Over time we tend to neglect this.
    8. Instead of creating huge async functions with many await asyncFunction() in it, it is better to create smaller async functions. This way, we will be aware of not writing too much blocking code.
    9. Another advantage of using smaller async functions is that you force yourself to think of which async functions can be run in parallel.

- 代码展示

    1.  promise nesting 的进化： 
    - 版本一（promise + callback）
    ```js
    const a = () => new Promise( resolve => {
        setTimeout( () => resolve( 'result of a()' ), 1000 ); // 1s delay
    } );

    const b = () => new Promise( resolve => {
        setTimeout( () => resolve( 'result of b()' ), 500 ); // 0.5s delay
    } );

    const c = () => new Promise( resolve => {
        setTimeout( () => resolve( 'result of c()' ), 1100 ); // 1.1s delay
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

    版本二 （promise + callback + 合并）
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

    版本三：（promise + return promise）
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

    版本四：（async + promise）

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

    2. (版本4 的注释)Async/Await is a fancier syntax to `handle multiple promises in synchronous code fashion. `When we put async keyword before a function declaration, `it will return a promise and we can use await keyword inside it which blocks the code until promise it awaits resolves or rejects.`(验证了追前的一些关于 async 定义函数的想法。)

    3. Promise 的定义方式

    ```js
    const promiseA = new Promise ((resolve, reject) =>{
        setTimeout(()=>{
            resolve('result of a()')
        }, 1000)
    });

    promiseA
    .then((res)=>{
        console.log(res);
    })
    .catch(err =>{
        console.log('promiseA error:',error)
    })
    .finally(()=>{
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
    2. setTimeout  ---》 已经开始计时
    3. Promise.rsolve('Promise')
    4. console.log(`End!`);

    queue --->
    6. console.log('Promise');  >>> microtasks(Promise所在群组)
    7. console.log('Timeout!'); >>>`(macro)task queue`

    这里例子里面最好的设计就是把 setTimeout 的时间设计为 0.
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
                console.log( 'Async: Promises resolved: ', resultA, resultB );
    };
    const promiseAsync = getPromiseAsync();
    ```



    6. 观点：`The biggest misconception about Promises in JavaScript is that they are asynchronous. Well, not everything of Promises is asynchronous. `

    ```js
    const promiseA = new Promise((resolve, reject) =>{
        console.log(`Creating promise`);

        setTimeout(()=>{
            reject(`something bad happened in a()!`)
        }, 1000);

        console.log(`Exiting promise executot.`)
    })

    console.log(`I am sync job 1!`);

    promiseA
    .then((res)=>{
        console.log(`PromiseA success:`, res);
    })
    .catch(err =>{
        console.log('promiseA error:',err)
    })
    .finally(()=>{
        console.log(`a() is done!`);
    });

    console.log(`I am sync job 2!`);
    console.log(`I am sync job 3!`);
    ```

    - 以上例子说明：As you can see from the example above, our code from the start to finish is executing in a synchronous manner. `The executor function of a promise also runs in a synchronous manner. `Since we have a setTimeout call in the executor function which contains resolve call, it will execute when all asynchronous code is executed. `(当编译器从上到下执行时，遇到 promise 会先执行 promise 里面的 sync function，然后把 async function 放进 event loop 的对应 queue 中，这个是跟之前以为 promise 就全部放在 queue 的认识不一样)`

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

    - 为了防止这种打乱顺序的情况，一般来说都把 promise 放在一个函数定义里面作为返回值，这个在第六篇里面有详细介绍。这个在参考第四点的代码。

    8. promise 里面的 catch 捕捉 系统错误。
    ```js
    const promiseA = new Promise( ( resolve, reject ) => {
        i++;

        setTimeout( () => {
            resolve( i );
        }, 1000 ); // resolve after 1 second
    } );

    promiseA
    .then( ( result ) => {
        console.log( 'promiseA success:', result );
    } );
    ```

    9. 关于 promise.all 和 promise.race    
    - `promise.race 例子`

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


    Promise.race( [ a(), b(), c() ] )
    .then( ( data ) => {
        console.log( 'success: ', data );
    } )
    .catch( ( error ) => {
        console.log( 'error: ', error );
    } );
    ```

    - `promise.all 例子`

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

    Promise.all( [ a(), b(), c(), { key: 'I am plain data!' } ] )
    .then( ( data ) => {
        console.log( 'success: ', data );
    } )
    .catch( ( error ) => {
        console.log( 'error: ', error );
    } );
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

    - 上面这个例子的分析，If any of the promises is rejected inside an async function, the promise it returns will reject as well with the error message. The returned promise is also rejected if any runtime error occurs inside the async function (similar behavior to a promise which rejects when a runtime error occurs in Promise constructors executor function). `(这个操作有崩溃风险，一个崩全部崩，需要增加 catch)`

    - In the above example, promise returned by b() rejects which crashes the thread in which async function is running and it is handled by catch handler of the promise it returns. `To safely handle promise rejections, we should use try/catch method inside async functions.`

    修改成：（添加 try catch）

    ```js
    const a = () => new Promise(resolve => {
        setTimeout(() => resolve('result of a()'), 1000); // 1s delay
    });

    const b = () => new Promise((resolve, reject) => {
        setTimeout(() => reject('result of b()'), 500); // 0.5s delay
    });

    const c = () => new Promise(resolve => {
        setTimeout(() => resolve('result of c()'), 1100); // 1.1s delay
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

    // doJobs() returns a promise
    doJobs()
        .then((result) => {
            console.log('success:', result);
        })
        .catch((error) => {
            console.log('error:', error);
        });

    // normal flow
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
    2. console.log('In function!');
    3. console.log('After function!');

    queue --->
    4. Promise.resolve('One!');
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
    async function logFetch(url) {
        try {
            const response = await fetch(url);
            console.log(await response.text());
        }
        catch (err) {
            console.log('fetch failed', err);
        }
    }
    ```

    12. `定义一个 promise 包装函数，然后定义一个 async 函数去调用这个包装函数`

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

        })
        .catch(function (error){

        });
    ```

    13. 关于callback hell 的代码：
    ```js
    function a() {
	setTimeout( function() {
        console.log( 'result of a()' );
    }, 1000 ); // 1 second delay
    }

    function b() {
        setTimeout( function() {
            console.log( 'result of b()' );
        }, 500 ); // 0.5 second delay
    }

    function c() {
        setTimeout( function() {
            console.log( 'result of c()' );
        }, 1200 ); // 1.1 second delay
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
    function a( callback ) {
        setTimeout( () => {
            console.log( 'result of a()' );
            callback();
        }, 1000 ); 
    }

    function b( callback ) {
        setTimeout( () => {
            console.log( 'result of b()' );
            callback();
        }, 500 );
    }

    function c( callback ) {
        setTimeout( () => {
            console.log( 'result of c()' );
            callback();
        }, 1200 ); 
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
    function a( callback ) {
        setTimeout( () => {
            console.log( 'result of a()' );
            callback();
        }, 1000 ); 
    }

    function b( callback ) {
        setTimeout( () => {
            console.log( 'result of b()' );
            callback();
        }, 500 );
    }

    function c( callback ) {
        setTimeout( () => {
            console.log( 'result of c()' );
            callback();
        }, 1200 ); 
    }

    a(() => {
    console.log(`a() is done!`);
    b(() => {
        console.log(`b() is done!`);
        c(() => {
            console.log(`c() is done!`);
        })
    })

    // 这里介绍使用 callback hell 设计固定执行顺序。
    // 这个理念相当于按设计主动清空栈，从而把异步保证了顺序
    // 把原来异步执行的动作安排成同步顺序操作，且可以保证了延时的准确。
    ```