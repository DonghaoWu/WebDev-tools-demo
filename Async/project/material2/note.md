Ajax is the backbone of Javascript application. It’s used heavily with SPA(Single Page Application). It’s used to communicate with the server.

In order to fully understand ajax, we need to understand the async nature of javascript and how to deal with the `async programming.`

Javascript is full with async programming. Below are some of the examples.`(异步函数类型)`

- AJAX Call
- setTimeout or setInterval
- Reading a file
- Events

Async in Javascript is about two activities, where one activity triggers another activity, which will be completed in future.`（此处应该提取概念）`

`Async activity in daily life:`

- Timer Example :-
- AJAX Example :-
- File Reader Example :-
- Event Listener Example :-

I came across an awesome video on event loop which explains how browser handles the `async operation. `

AJAX is used to communicate between client and server. Its important to understand how it works, what are the challenges and how to solve them.

- Using Callback :-

Callback can appear very confusing in the beginning. But it’s very simple when you get the concept right. What is callback and why do we need it in ajax.

What is callback :- Let’s say we have a function F1 which calls F2. F2 is doing some async operation like AJAX. F1 would like to know the result of the ajax call. Now F1 will pass another function say C1 as an additional parameter to F2 which F2 will call after it process the ajax request completely.`（此处应该提取概念）`

Why do we need callback :- We need callback because we don’t want to duplicate the ajax code every time we need. We want to create a generic ajax function which takes ajax details as input along with callback reference. After completing the call, it calls the callback so that caller can resume with the result of the ajax call.

(用 callback 处理 AJAX)。`（此处应该提取概念）`
We can use the ajax service function at n number of places by passing ajax call details like URL, method and callback reference. `Callbacks are great way to separate the core logic of ajax with the rest of the application. `But unfortunately, it becomes very difficult to handle callback when we do series of ajax calls where one call is dependent on previous call. `We might encounter difficulty in maintaining multiple callback references and handling multiple success and error` conditions. `Promise is a better way to manage multiple ajax calls. Let’s explore Promise next.`


`Promise is used to overcome issues with multiple callbacks and provide better way to manage success and error conditions.` Promise looks little complex in the beginning but its very simple and effective to deal with. `Promise is an object which is returned by the async function like ajax.`

There are two parts using a promise object. Inside async function (Part1) and where its called (Part2).
Part1 — Inside Async function,
- Promise object is created.
- Async function returns the promise object
- If async is done successfully, promise object is resolved by calling its resolve method.
- If async is done with error, promise object is rejected by calling its rejected method.

Part2 — Outside Async function
- Call the function and get the promise object
- Attach success handler, error handler on the promise object using `then method`

`这里的handler 指的是 .then 和 .catch`
If you notice, makeAjaxCall function returns a promise object and doesn’t take any callback. The promise object is resolved when the data comes from the server or is rejected in terms of failure. `We can attach our handlers to the promise object.` Promise object can be resolved or rejected only one time. We can add multiple success and error handlers on the promise object. Each one will be called in the same order as they are registered.

By Default, AJAX cannot make cross domain call, browser will reject the calls to the different domain. In order to make cross domain call there are two options

- CORS is the new way to deal with cross origin AJAX request. github api are CORS enabled. In order to enable CORS, response should contain Access-Control-Allow-Origin header with the domain value or * to work for all. Github has set as *.

- JSONP can also be used if CORS cannot be enabled by server or for old browsers. JSONP actually uses script tag to get the data from the server. Script is allowed to be fetched from any domain, So in JSONP, we need to create a script with the url as src and the server has to wrap the response in a callback function. Response sent by server is actually a javascript code which contains data inside a wrapper function. In JSONP, there is no ajax call being made.

Promise is the right way to deal with `async activity`. Its clean and very flexible. It makes your application maintainable and you can extend the functionality very easily. `Callback is easy to start with but certainly not the right direction. If you are new to javascript, you should know callback but should use promise.`

第二篇：
- https://medium.com/@lydiahallie/javascript-visualized-promises-async-await-a3f1aad8a943
- https://itnext.io/javascript-promises-and-async-await-as-fast-as-possible-d7c8c8ff0abc
- https://itnext.io/javascripts-async-await-versus-promise-the-great-debate-6308cb2e10b3
- https://medium.com/codebuddies/getting-to-know-asynchronous-javascript-callbacks-promises-and-async-await-17e0673281ee
- https://medium.com/better-programming/should-i-use-promises-or-async-await-126ab5c98789


第二篇：

https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke

https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif

`（callback hell 的坏处）`
We end up with many nested callback functions that are dependent on the previous callback function. This is often referred to as a callback hell, as we end up with tons of nested callback functions that make the code quite difficult to read!

“A promise is a placeholder for a value that can either resolve or reject at some time in the future”`（官方定义）`

Awesome! We finally know how to get rid of the "pending" status and the undefined value! The status of a promise is "fulfilled" if we invoked the resolve method, and the status of the promise is "rejected" if we invoked the rejected method.
The value of a promise, the value of [[PromiseValue]], is the value that we pass to the either the resolved or rejected method as their argument.`（一般来说，promise 的 value 也还是 promise。）`

Luckily, Promises can help us fix this! First, let’s rewrite the entire code block, so that each function returns a Promise instead.

```js
function getImage(file){
    return new Promise((res, rej) =>{
        try{
            const data = readFile(file);
            res(data);
        }
        catch(err){
            rej(new Error(err));
        }
    })
}
```

To a promise, we can attach 3 methods:
- .then(): Gets called after a promise resolved.
- .catch(): Gets called after a promise rejected.
- .finally(): Always gets called, whether the       promise resolved or rejected.

(所以一个 promise 内建的的 变量 和 method 挺多的)

The .then method receives the value passed to the resolve method.`（获得的是是变量还是promise？）`

Finally, we have the value that got resolved by the promise without having that entire promise object! We can now do whatever we want with this value.`保留疑问`

这里有个小记，Promise 的 method 是可以直接调用的：

```js
new Promise(res =>res('Yay!'))

//调用
Promise.resolve('Yay!')
```

The result of the .then itself is a promise value. This means that we can chain as many .thens as we want: the result of the previous then callback will be passed as an argument to the next then callback!`(这解释了上面的疑问)`

如下图：
`(已截图)`
- 要注意的是这图片里用单行箭头方式 省略了关键词 `return`.
```js
Promise.resolve(5)
.then(res => res*2)
```

- Microtasks and (Macro)tasks 
- `(关于 async 函数的运作顺序)`

```js
console.log(`start`);

Promise.resolve('Promise')
.then(res => console.log(res));

console.log(`End!`);
```

Yes! Hoewver, within the Event Loop, there are actually two types of queues: the (macro)task queue (or just called the task queue), and the microtask queue. The (macro)task queue is for (macro)tasks and the microtask queue is for microtasks.

So what’s a (macro)task and what’s a microtask? Although there are a few more than I’ll cover here, the most common are shown in the table below!
`(Macro)task: `setTimeout | setInterval
`Microtask: `process.nextTick | Promise callback | queueMicrotask

Ahh, we see Promise in the microtask list! 😃 When a Promise resolves and calls its then(), catch() or finally(), method, the callback within the method gets added to the microtask queue! This means that the callback within the then(), catch() or finally() method isn't executed immediately, essentially adding some async behavior to our JavaScript code!

So when is a then(), catch() or finally() callback executed? The event loop gives a different priority to the tasks:
1. All functions in that are currently in the call stack get executed. When they returned a value, they get popped off the stack.
2. When the call stack is empty, all queued up microtasks are popped onto the callstack one by one, and get executed! (Microtasks themselves can also return new microtasks, effectively creating an infinite microtask loop 😬)
3. If both the call stack and microtask queue are empty, the event loop checks if there are tasks left on the (macro)task queue. The tasks get popped onto the callstack, executed, and popped off!

(`在这里把时间设在 0 是一个很好的例子。`)
```js
console.log(`start`);

setTimeout(()=>{
    console.log('Timeout!')
}, 0);

Promise.resolve('Promise')
.then(res => console.log(res));

console.log(`End!`);
```

The engine encounters the setTimeout method, which gets popped on to the call stack. The setTimeout method is native to the browser: its callback function (() => console.log('In timeout')) will get added to the Web API, until the timer is done. Although we provided the value 0 for the timer, the call back still gets pushed to the Web API first, after which it gets added to the (macro)task queue: setTimeout is a macro task!

The engine encounters the Promise.resolve() method. The Promise.resolve() method gets added to the call stack, after which is resolves with the value Promise!. Its callback function, the then() method in this case, gets added to the microtask queue.

The engine sees the callstack is empty now. Since the call stack is empty, it’s going to check whether there are queued tasks in the microtask queue! And yes there are, the promise then callback is waiting for its turn! It gets popped onto the call stack, after which it logs the resolved value of the promise: the string Promise!in this case.

The engine sees the call stack is empty, so it’s going to check the microtask queue once again to see if tasks are queued. Nope, the microqueue is all empty.

It’s time to check the (macro)task queue: the setTimeout callback is still waiting there! The setTimeout callback gets popped on to the callstack. The callback function returns the console.log method, which logs the string "In timeout!". The setTimeout callback get popped off the callstack.

- Async/Await
`(作用)`
With the introduction of the async and await keywords, we can create async functions that implicitly return a promise. 

Previously, we saw that we can explicitly create promises using the Promise object, whether it was by typing new Promise(() => {}), Promise.resolve, or Promise.reject.

`Instead of explicitly using the Promise object, we can now create asynchronous functions that implicitly return an object! This means that we no longer have to write any Promise object ourselves.`

```js

Promise.resolve(`Hello`);

//
async function greet(){
    return 'Hello';
}
```

Although the fact that async functions implicitly return promises is pretty great, the real power of async functions can be seen when using the await keyword! With the await keyword, we can suspend the asynchronous function while we wait for the awaited value return a resolved promise. If we want to get the value of this resolved promise, like we previously did with the then() callback, we can assign variables to the awaited promise value!

```js
const one = () => Promise.resolve('One!');

async function myFunc(){
    console.log('In function!');
    const res = await one();
    console.log(res);
}

console.log('Before function!');
myFunc();
console.log('After function!');
```

`可以尝试看看同步模式下 myFunc 返回什么值`。
```js
const x = myFunc();
console.log(x);
```

However, I hope that the “unexpected” or “unpredictable” behavior that you might encounter when working with async JavaScript makes a bit more sense now!

- `第二篇小记，对于 async programming，更多的是列举多代码例子去分析，在分析的过程中强化记忆。`


第三篇：
https://itnext.io/javascript-promises-and-async-await-as-fast-as-possible-d7c8c8ff0abc

这一篇的出发点是讨论异步函数的执行顺序。

`JavaScript executes code in a single thread, which makes it blocking. `Let’s take a simple example of calling three functions in series.

As we can see from the above result, each function call and console.log statement is executing in series AKA in a synchronous manner. `This means until the function a has returned, the next line of code won’t be called. By default, a function with no return statement returns undefined value.`(正常同步函数行为)

Using Web APIs, some JavaScript jobs can be transferred to other threads.

`Web APIs are APIs that extends JavaScript functionality to perform asynchronous tasks.` For example, setTimeout is a Web API that performs some action after a given delay. To understand how Web APIs work, or least how setTimeout works, you should check out my article on the event loop.(这里，作者试图把所有 async 行为归类为 web APIs)

`Web APIs is not a part of the JavaScript standard. They are not included in the JavaScript engine. Instead, they are provided by the browser or server-side JavaScript frameworks like Node.js`

Basically, setTimeout(callback, delay) function takes a callback and stores it temporarily. `It waits for delay given in milliseconds and then pushes the callback function in the stack once the stack it is empty.` Then the callback function gets executed. This is basically how all Web APIs work.`(这里的意思是等到时间了，同时还有堆栈空了，这两个条件符合之后才会执行对应的 callback)。`

Natively, most Web APIs are callback based. They need a callback function to notify when an asynchronous operation is done.`（处理 web APIs 的方法之一就是使用 callback）`

```js
const a = ()=>{
    setTimeout(()=>{
        console.log(`result of a()`)
    },1000)
}

const b = ()=>{
    setTimeout(()=>{
        console.log(`result of a()`)
    },500)
}

const c = ()=>{
    setTimeout(()=>{
        console.log(`result of a()`)
    },1200)
}

a();
console.log(`a() is done!`)

b();
console.log(`b() is done!`)

a();
console.log(`c() is done!`)
```

`The event loop is endlessly running single-threaded loop that runs on the main JavaScript thread and listens for the different events. Its job is to accept callback functions and execute them on the main thread. `Since event loop runs on the main thread, if the main thread is busy, event loop is basically dead for that time.

The macrotask queue is a queue of the callback function waiting to be executed. `The event loop pushes oldest queued callback functions (FIFO) from macrotask queue on to the main call stack one at the time where they are executed synchronously. Event loop only pushes a callback function to the stack when the stack is empty or when the main thread is not busy.`(这里解释了 event loop 的作用)

The stack will become empty when all synchronous function calls are executed. `This is why console.log statements outside our functions are executed first because they were pushed on the stack before console.log statements inside the callback functions.`

This is why all the console.log statements outside the functions are getting printed in a synchronous manner while console.log statements inside functions are getting called in order of their time delay.

So, here is a tricky question? How can we print console.log statement for each function call only after console.log statement inside that function is printed? 
`(把一群同步异步函数按既定顺序输出)`

```
result of a()
a() is done!
result of b()
b() is done!
result of c()
c() is done!
```

- 方案一： callback 

The answer lies in the callback function itself. A callback function according to its definition is a function which will be called when a job is finished. Let’s pass a callback function to each of our functions a, b, and c which contains console.log statement in it.

```js

```

In the callback of setTimeout, we called the callback function received as an argument which indeed prints the done console.log('...done!') statement. `This is how we can make sure that a job should execute after an async job is finished, that is, by passing a callback function as an argument.`

`But still, we haven’t resolved the issue. What we want is, the jobs should execute in series. What we can do to make sure a() completes first and then b() and then c(). Welcome to callback hell!`

The simple idea is to call b() in the callback of a because that’s where we know that a() has done its job and similarly call c() in the callback of a.

- Promise to the rescue

Promises make our job a little easier when it comes to writing complicated asynchronous programs. A promise is an object which has then and catch methods on it. One of this method gets called when the promise returns a value or an error.

`A promise object is created from Promise constructor/class which needs a callback function AKA executor function ( either in ES5 syntax or a fat arrow function). This callback function receives the resolve and reject function arguments, either of which we must envoke with an optional payload.`

From the above syntax, we can see that we have to call either the resolve function with an optional success payload or reject function with optional error payload. `These function can be called from within an async callback as well, like from within a callback of setTimeout function.` If no payload passed to these function, the payload is undefined.(介绍应用)

As we can see, then, catch and finally methods are chainable, we will see why that is in later topics. Let’s introduce a promise in the previous example.

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

it is standard practice to use the catch method handler to handle promise rejection instead of using then method. If you use both catch and then method to handle promise rejection, catch handler will be ignored.



- How Do Promises work?`(这里谈到了 promise 的内部执行顺序)`

The biggest misconception about Promises in JavaScript is that they are asynchronous. Well, not everything of Promises is asynchronous. 


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

As you can see from the example above, our code from the start to finish is executing in a synchronous manner. `The executor function of a promise also runs in a synchronous manner. `Since we have a setTimeout call in the executor function which contains resolve call, it will execute when all asynchronous code is executed.

then and catch as well as finally methods of a promise register the callback functions passed to them and these callbacks are provided to the event loop when the promise is resolved or rejected. These callbacks are added to the microtask queue which has higher priority than macrotask queue.` Hence event loop will prefer to execute them first.`

```js
setTimeout (() =>{
    console.log(`setTimeout callback`)
},0);

const promiseA = new Promise((resolve) => resolve());

console.log(`I am sync job 1!`);

promiseA.then(()=>{
    console.log('PromiseA success!');
})
console.log(`I am sync job 2!`);
console.log(`I am sync job 3!`);
```

But an important thing to remember about promises is that even when we are calling resolve or reject immediately, i.e., `without an async function, its callback handlers will be called only when the main JavaScript execution has done all pending work. That means, once the stack is empty, our promise handlers will get executed. Let’s see that in action.`

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

Another important thing to remember is, catch handler will be invoked by the promise not only when we reject the promise `but even when JavaScript encounter runtime error in the executor function of the promise.`

```js
const promiseA = new Promise ((resolve, reject)=>{
    i++;
});
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
```

In the above example, we are trying to increment a variable which does not exist. Since this error was thrown in the executor function, Promise catches it and calls then catch handler with the error payload. If the runtime error occurs in the callback function of an async call (inside the executor function), then the error will won’t be caught, as shown below.

```js
const promiseA = new Promise ((resolve, reject)=>{
    setTimeout(()=>{
        i++;
        resolve(i)
    },1000);
});
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
```

Both catch and finally handlers are optional. But it is not safe to eliminate catch handler completely. `This is because even though we are calling resolve from inside the promise executor function, there might be hidden bugs which throw the runtime error.`

Since we haven’t registered a callback function to handle the promise failure in catch handler method, `the error will be thrown in our main execution context which might crash our program.`


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
In the above example, since we are not handling rejection of the promise, `the error thrown inside the promise executor function is not caught and our main program crashes.` So in nutshell, always have catch handler to catch errors of a promise even when errors are not expected.

- Promise handler returns a new promise
(返回值)
`(这是比较疑惑的地方)`
We have seen then, catch and finally methods which are prototype methods of Promise class. These methods are chainable, which means we can call them on each other. `This is possible because all these methods return a new promise.`

- If the promise is fulfilled, then returns a new fulfilled promise with undefined payload (data). If there is a return statement in the handler function, it returns a fulfilled promise with that return value as the payload.`（如果在 then 里面没有 return 关键词，就返回一个无定义值的 promise，如果有，就返回一个 成功的，可以用下一个 then 接着的 promise，且哪个 promise 所带的值就是有数值的，这个解释好像不够清楚。）`

- If the promise is rejected, catch returns a new promise with undefined payload (data). If there is a return statement in the handler function, it returns a fulfilled promise with that return value as the payload.

- finally returns a new promise with undefined payload (data). If there is a return statement in the handler function, it returns a fulfilled promise with that return value as the payload.

- Only first then is invoked when the promise is fulfilled and only first catch is invoked when the promise is rejected. After that, depending on the appearance of then and catch handlers, the handler function will be called. Let’s see an example of this in details.

```js
Promise.reject( 'Reject DATA!' )
.then( ( result ) => {
    console.log( '[1] then', result ); // won't be called
    return '[2] then payload';
} )
.finally( ( ) => {
    console.log( '[1] finally' ); // first finally will be called
    return '[1] finally payload';
} )
.then( ( result ) => {
    console.log( '[2] then', result ); // won't be called
    return '[2] then payload';
} )
.catch( ( error ) => {
    console.log( '[1] catch', error );  // first catch will be called
    return '[1] catch payload';
} )
.catch( ( error ) => {
    console.log( '[2] catch', error );  // won't be called
    return '[2] catch payload';
} )
.then( ( result ) => {
    console.log( '[3] then', result ); // will be called
    return '[3] then payload';
} )
.finally( () => {
    console.log( '[2] finally' ); // will be called
    return '[2] finally payload';
} )
.catch( ( error ) => {
    console.log( '[3] catch', error );  // won't be called
    return '[3] catch payload';
} )
.then( ( result ) => {
    console.log( '[4] then', result ); // will be called
    return '[4] then payload';
} );
```

Another cool thing is, we can return a promise from within these handlers instead of plain values. What this will do is, instead of returning a fulfilled promise with the returned value as the payload, we get the returned promise.`（除了返回带 值的 promise 之外，还可以返回一个新的 promise，当这个 新 promise 完成之后，就进入 then 或者 catch）`

```js
Promise.resolve( 'Fulfill DATA!' )
.then( ( result ) => {
    console.log( '[1] then', result );

    return new Promise( resolve => {
        setTimeout( () => {
            resolve( 'Nested promise data!' );
        }, 1000 ); // resolve after 1 second
    } );
} )
.then( ( result ) => {
    console.log( '[2] then', result );
} );
```

When a promise is returned from a handler, we don’t need to handle promise rejection on it. It will be cascaded to parent until it finds the catch handler.

```js
Promise.resolve( 'Fulfill DATA!' )
.then( ( result ) => {
    console.log( '[1] then', result );

    // inner promise
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
    console.log( '[1] catch', error ); // for main and inner promise
} );
```

- Promise nesting
Now the real question is, using promises how we can execute some async jobs in series as we did with the callback nesting in the earlier example? A naive answer would be using nesting of promises callback. `( promise + callback？)`



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


// call a(), b(), and c() in series
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

In the above example, from our function a, b andc, we have returned a promise which fulfils after some time. We made sure than when one promise is created and fulfilled, only then another promise is created and handled.

As we have seen in the earlier topic that a promise handler method returns a new promise, and rejection handling of the returned promise can be taken care by the parent promise handler, we can significantly shorten our code.`(对上一段代码的简化！)`

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


// call a(), b(), and c() in series
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

- Async/Await 

- 在此之前跳过了 promise.all 和 promise.race

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


// race a(), b(), c()
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
    setTimeout( () => resolve( 'result of a()' ), 1000 ); // 1s delay
} );

const b = () => new Promise( resolve => {
    setTimeout( () => resolve( 'result of b()' ), 500 ); // 0.5s delay
} );

const c = () => new Promise( resolve => {
    setTimeout( () => resolve( 'result of c()' ), 1100 ); // 1.1s delay
} );


// resolve once a(), b(), c() resolves
Promise.all( [ a(), b(), c(), { key: 'I am plain data!' } ] )
.then( ( data ) => {
    console.log( 'success: ', data );
} )
.catch( ( error ) => {
    console.log( 'error: ', error );
} );
```

Async/Await is a fancier syntax to `handle multiple promises in synchronous code fashion. `When we put async keyword before a function declaration, `it will return a promise and we can use await keyword inside it which blocks the code until promise it awaits resolves or rejects.`(验证了追前的一些关于 async 定义函数的想法。)

```js
async function myFunction() {
   var result = await new MyPromise();
   console.log( result );
}

myFunction(); // returns a promise
```

 - 可以认为 promise 是自动运行的。

In the above example, we have created a function myFunction which has async keyword on it. This keyword makes it asynchronous, `which means when this function is called, a promise is returned and normal code execution will commence as usual.`

We can say, await keyword `inside a async function blocks the execution of JavaScript in that function context` until the promise it is awaiting is settled. This gives us cleaner syntax to work with promises in a synchronous fashion.

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


const doJobs = async () => {
	var resultA = await a();
  var resultB = await b();
  var resultC = await c();
  
  return [ resultA, resultB, resultC ];
};

// doJobs() returns a promise
doJobs().then( ( result ) => {
   console.log( 'success:', result );
} )
.catch( ( error ) => {
    console.log( 'error:', error );
} );

// normal flow
console.log( 'I am a sync operation!' );
```
In the above example, we have returned an array of results of different promise resolutions inside the async function. This will be the payload of the promise async function returns if it fulfills.

If any of the promises is rejected inside an async function, the promise it returns will reject as well with the error message. The returned promise is also rejected if any runtime error occurs inside the async function (similar behavior to a promise which rejects when a runtime error occurs in Promise constructors executor function).

In the above example, promise returned by b() rejects which crashes the thread in which async function is running and it is handled by catch handler of the promise it returns. `To safely handle promise rejections, we should use try/catch method inside async functions.`

```js
const a = () => new Promise( resolve => {
    setTimeout( () => resolve( 'result of a()' ), 1000 ); // 1s delay
} );

const b = () => new Promise( ( resolve, reject ) => {
    setTimeout( () => reject( 'result of b()' ), 500 ); // 0.5s delay
} );

const c = () => new Promise( resolve => {
    setTimeout( () => resolve( 'result of c()' ), 1100 ); // 1.1s delay
} );


const doJobs = async () => {
	try {
        var resultA = await a();
        var resultB = await b();
        var resultC = await c();
    
        return [ resultA, resultB, resultC ];
    } catch( error ) {
        return [ null, null, null ];
    }
};

// doJobs() returns a promise
doJobs().then( ( result ) => {
   console.log( 'success:', result );
} )
.catch( ( error ) => {
    console.log( 'error:', error );
} );

// normal flow
console.log( 'I am a sync operation!' );
```

We can also return a new promise from inside async function.`(这说明 async 定义的返回值就是 promise， 此外 async 里面放什么元素在之前也有讨论。)`

`You can ignore promise handlers on the promise returned by async function call as long as it doesn’t return any value or a promise. This pattern is very common nowadays to completely get rid of promise handlers.`(需要更清晰的指引去把 promise 与 async 之间转化)。

One major advantage that async/await syntax `brings is the ability to create async generators. By making generator function async,` we can use `await` keyword with each yield statement which returns a value when the corresponding promise is resolved.

```js
const a = () => new Promise( resolve => {
    setTimeout( () => resolve( 'result of a()' ), 1000 ); // 1s delay
} );

const b = () => new Promise( ( resolve, reject ) => {
    setTimeout( () => resolve( 'result of b()' ), 500 ); // 0.5s delay
} );

const c = () => new Promise( resolve => {
    setTimeout( () => resolve( 'result of c()' ), 1100 ); // 1.1s delay
} );

// async generator function
const MyAsyncGenerator = async function*() {
    yield await a();
    yield await b();
    yield await c();
};

// generator object
const gen = MyAsyncGenerator();

// get `gen` values 
(async () => {
    console.log( await gen.next() );
    console.log( await gen.next() );
    console.log( await gen.next() );
    console.log( await gen.next() );
})();
```


The best way to use a generator is with for-of loop. Previously, it was impossible to loop around an array of promises as for-of loop runs synchronously and it doesn’t wait for a promise to resolve. But some browsers support for-of loop which awaits for promises to resolve. This is done using await keyword. Since for-of loop can iterate both an array or an iterable object (like generators), we can implement this in the above example.


```js
const a = () => new Promise( resolve => {
    setTimeout( () => resolve( 'result of a()' ), 1000 ); // 1s delay
} );

const b = () => new Promise( ( resolve, reject ) => {
    setTimeout( () => resolve( 'result of b()' ), 500 ); // 0.5s delay
} );

const c = () => new Promise( resolve => {
    setTimeout( () => resolve( 'result of c()' ), 1100 ); // 1.1s delay
} );

// async generator function
const MyAsyncGenerator = async function*() {
    yield await a();
    yield await b();
    yield await c();
};

// generator object
const gen = MyAsyncGenerator();

// loop on generator in async manner
( async () => {
    for await ( let value of gen ) {
        console.log( value );
    }
} )();
```

- Is async/await blocks the main thread
From await syntax keyword looks like that it blocks the execution of the thread until the promise it is awaiting on resolves. But that’s is not the case. The while async/await pattern is still based on classical Promise syntax.

This answer on StackOverflow explains how async/await syntax works behind the scene. In a nutshell, async function is more like your promise executor function which runs synchronously. The await keyword is like a then callback that wraps all the statements below it.

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

Even though promises are cool, there are certain limitations with them. `For example, they are not cancellable. Once a promise is created, it can not be terminated. This means, its handlers will invoke sometime in the future, no matter what.`


Another thing about promises is, they are not replayable or retriable. Once a promise is resolved and handled, `you can not invoke it again to do the same task. This is one of the frustrating drawbacks of promise.`

第四篇：
https://itnext.io/javascripts-async-await-versus-promise-the-great-debate-6308cb2e10b3

I didn’t really see any benefits of async/await that outweighed using promises — they both ended up accomplishing the same thing: `handling asynchronous data calls in a performant, consistent manner.`

- AJAX & Callbacks
AJAX, which stands for Asynchronous JavaScript And XML and callbacks were an OG way of handling asynchronous calls in JavaScript. What it boils down to, is when one function is meant to be executed after another function has finished executing — hence the name ‘call back’.

callback hell

If you’d like to error handle that or even try to add some new functionality in the middle of that mess, be my guest.

I, however, won’t have anything to do with it, so let’s agree that AJAX and callbacks were once a way to handle asynchronous data, but they are no longer the de facto way. There’s much better solutions that have come about that I’ll show you next. Let’s move on to promises.

`A Promise is an object representing the eventual completion or failure of an asynchronous operation…Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.`

(这里提到 asynchronous operation)

This may seem like a minor improvement right now, but once you start chaining promises together or waiting for multiple promises to resolve before moving forward, having one single .catch() block at the end to handle anything that goes wrong within, is pretty handy. Read on and I’ll show you.

Pros of Promises over Callbacks
In addition to a cleaner syntax, promises offer advantages over callbacks.

- Callbacks added with then() even after the success or failure of the asynchronous operation, will be called, as above.

- Multiple callbacks may be added by calling then() several times. Each callback is executed one after another, in the order in which they were inserted (this is the chaining I mentioned earlier).

- It’s possible to chain events together after a failure, i.e. a catch, which is useful to accomplish new actions even after an action failed in the chain.

- Promise.all() returns a single Promise that resolves when all of the promises passed as an iterable have resolved or when the iterable contains no promises. Callbacks can’t do that.

- Promises solve a fundamental flaw with the callback pyramid of doom, by catching all errors, even thrown exceptions and programming errors. This is essential for functional composition of asynchronous operations.

`The async function declaration defines an asynchronous function, which returns an AsyncFunction object. An asynchronous function is a function which operates asynchronously via the event loop, using an implicit Promise to return its result. But the syntax and structure of your code using async functions is much more like using standard synchronous functions`

`An async function can contain an await expression that pauses the execution of the async function and waits for the passed Promise's resolution, and then resumes the asyncfunction's execution and returns the resolved value.`

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

- The syntax and structure of your code using async functions is much more like using standard synchronous functions.

- In the examples above, the logFetch() functions are the same number of lines, but all the callbacks are gone. This makes it easier to read, especially for those less familiar with promises.

- Another interesting tidbit, is that anything you await is passed through Promise.resolve() (for us, typically the .then(result) resolution of the promise), so you can safely await non-native promises. That’s pretty cool.

- And you can safely combine async/await with Promise.all() to wait for multiple asynchronous calls to return before moving ahead.

The V8 team made improvements that make async/await functions run faster than traditional promises in the JavaScript engine.

`Promises and async/await accomplish the same thing. They make retrieving and handling asynchronous data easier. They eliminate the need for callbacks, they simplify error handling, they cut down on extraneous code, they make waiting for multiple concurrent calls to return easy, and they make adding additional code in between calls a snap.`

第五篇：

https://medium.com/codebuddies/getting-to-know-asynchronous-javascript-callbacks-promises-and-async-await-17e0673281ee

`(这一篇对 callback 的认识比较深)`
That is because a JavaScript program is single threaded and all code is executed in a sequence, not in parallel. In JavaScript this is handled by using what is called an “asynchronous non-blocking I/O model”. What that means is that while the execution of JavaScript is blocking, I/O operations are not. I/O operations can be fetching data over the internet with Ajax or over WebSocket connections, querying data from a database such as MongoDB or accessing the filesystem with the NodeJs “fs” module. All these kind of operations are done in parallel to the execution of your code and it is not JavaScript that does these operations; to put it simply, the underlying engine does it.

Registering event listeners in a browser with “addEventListener”, reading a files content with “fs.readFile” or registering a middleware in an express web server with “server.use” are examples of common APIs that uses callbacks.
`之前已经存在的 callback 函数，后来这种形式用来处理 async operation`

`As you can see, “request” takes a function as its last argument. This function is not executed together with the code above. It is saved to be executed later once the underlying I/O operation of fetching data over HTTP(s) is done. The underlying HTTP(s) request is an asynchronous operation and does not block the execution of the rest of the JavaScript code. The callback function is put on a sort of queue called the “event loop” until it will be executed with a result from the request.`
(这一段解释了整个运作过程)

Callbacks are a good way to declare what will happen once an I/O operation has a result, but what if you want to use that data in order to make another request? You can only handle the result of the request (if we use the example above) within the callback function provided.
（接着上一个 callback 的数据放到下一个 callback 中使用。）

```js
const request = require(‘request’);
let result;
request('http://www.somepage.com', function (error, response, body) {
    if(error){
        // Handle error.
    }
    else {
        result = body;
    }
});
console.log(result);
```

The last line will output “undefined” to the console because at the time that line is being executed, the callback has not been called. Even if the request were somehow to complete before the result variable is printed to the console (highly unlikely though), this code will still run to completion before the callback is executed anyway because that is the nature of the non-blocking I/O model in JavaScript.

So if we want to do a second request based on the result of a first one we have to do it inside the callback function of the first request because that is where the result will be available:

```js
request('http://www.somepage.com', function (firstError, firstResponse, firstBody) {
    if(firstError){
        // Handle error.
    }
    else {
        request(`http://www.somepage.com/${firstBody.someValue}`, function (secondError, secondResponse, secondBody) {
            if(secondError){
                // Handle error.
            }
            else {
                // Use secondBody for something
            }
        });
    }
});
```

When you have a callback in a callback like this, the code tends to be a bit less readable and a bit messy. In some cases you may have a callback in a callback in a callback or even a callback in a callback in a callback in a callback. You get the point: it gets messy.

One thing to note here is the first argument in every callback function will contain an error if something went wrong, or will be empty if all went well. `This pattern is called “error first callbacks” and is very common.` It is the standard pattern for callback-based APIs in NodeJs. `This means that for every callback declared we need to check if there is an error and that just adds to the mess when dealing with nested callbacks.`

This is the anti-pattern that has been named “callback hell”.

- Promise

A promise is an object that wraps an asynchronous operation and notifies when it’s done. This sounds exactly like callbacks, but the important differences are in the usage of Promises. `Instead of providing a callback, a promise has its own methods` which you call to tell the promise what will happen when it is successful or when it fails. The methods a promise provides are “then(…)” for when a successful result is available and “catch(…)” for when something went wrong.

```js
someAsyncOperation(someParams)
.then(function(result){
    // Do something with the result
})
.catch(function(error){
    // Handle error
});
```

One important side note here is that “someAsyncOperation(someParams)” is not a Promise itself but a function that returns a Promise.
`(这个纠正了我刚开始时的认识)`

The true power of promises is shown when you have several asynchronous operations that depend on each other, just like in the example above under “Callback Hell”. So let’s revisit the case where we have a request that depends on the result of another request. This time we are going to use a module called `“axios” that is similiar to “request” but it uses promises instead of callbacks. This is also to point out that callbacks and promises are not interchangeable.`


Instead of nesting callbacks inside callbacks inside callbacks, you chain .then() calls together making it more readable and easier to follow. `Every .then() should either return a new Promise or just a value or object which will be passed to the next .then() in the chain.` Another important thing to notice is that even though we are doing two different asynchronous requests we only have one .catch() where we handle our errors.` That’s because any error that occurs in the Promise chain will stop further execution and an error will end up in the next .catch() in the chain.`

A friendly reminder: `just like with callback based APIs, this is still asynchronous operations.` The code that is executed when the request has finished — that is, the subsequent .then() calls — `is put on the event loop just like a callback function would be. This means you cannot access any variables passed to or declared in the Promise chain outside the Promise.` The same goes for errors thrown in the Promise chain. You must also have at least one .catch() at the end of your Promise chain for you to be able to handle errors that occur. If you do not have a .catch(), any errors will silently pass and fade away and you will have no idea why your Promise does not behave as expected.

`(这个纠正了我刚开始时的认识)`


- Creating promises 
`这篇说到很多之前疑惑的点`

As stated above, callbacks are not interchangeable with Promises. `This means that callback-based APIs cannot be used as Promises. `The main difference with callback-based APIs is it does not return a value, it just executes the callback with the result. A Promise-based API, on the other hand, immediately returns a Promise that wraps the asynchronous operation, and then the caller uses the returned Promise object and calls .then() and .catch() on it to declare what will happen when the operations has finished.


The creation of a Promise object is done via the Promise constructor by calling “new Promise()”. It takes a function as an argument and that function gets passed two callbacks: one for notifying when the operation is successful (resolve) and one for notifying when the operation has failed (reject). What you pass as an argument when calling resolve will be passed to the next then() in the promise chain. The argument passed when calling reject will end up in the next catch(). It is a good idea to make sure that you always pass Error objects when calling reject.`如何建造 promise`

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

Note that it is within the function being passed to the Promise constructor that we start the asynchronous operation. That function is then responsible for calling resolve(success) when it’s done or reject(error) if there are errors.


This means that we can use the function “getAsyncData” like this:

```js
getAsyncData(“someValue”)
// Calling resolve in the Promise will get us here, to the first then(…)
.then(function(result){
    // Do stuff
})
// Calling reject in the Promise will get us here, to the catch(…)
// Also if there is an error in any then(..) it will end up here
.catch(function(error){
    // Handle error
});
```

The process of wrapping a callback based asynchronous function inside a Promise and return that promise instead is called “promisification”. We are “promisifying” a callback-based function. There are lots of modules that let you do this in a nice way but since version 8 NodeJs has a built in a helper called “util.promisify” for doing exactly that.`(专业名词)`

This means that our whole Promise wrapper above could instead be written like this:

```js
const { promisify } = require(‘util’);
const getAsyncData = promisify(getData);
getAsyncData(“someValue”)
.then(function(result){
    // Do stuff
})
.catch(function(error){
    // Handle error
});
```

- Async/Await

You don’t have to use it if you don’t want to. You will be fine with just using Promises.

`Async/Await is the next step in the evolution of handling asynchronous operations in JavaScript. It gives you two new keywords to use in your code: “async” and “await”.` Async is for declaring that a function will handle asynchronous operations and `await is used to declare that we want to “await” the result of an asynchronous operation inside a function that has the async keyword.`

The following is not a legal use of the await keyword since it can only be utilized inside a function with the async keyword in front of it:

A function call can only have the await keyword if the function being called is “awaitable”. A function is “awaitable” if it has the async keyword or if it returns a Promise. Remember when I said that callbacks and Promises are not interchangeable and you have to wrap a callback based function inside a Promise and return that Promise? Well, functions with the async keyword are interchangeable with functions that returns Promises which is why I stated that a function that returns a Promise is “awaitable”.`这个解释很好`

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
```

Also this will work:

```js
async function getSomeData(value){
    const result = await fetchTheData(value);
    return result;
}
getSomeData(‘someValue’)
.then(function(result){
    // Do something with the result
})
.catch(function (error){
    // Handle error
});
```

`An important consideration regarding async/await`

Async/await may make your asynchronous calls look more synchronous but it is still executed the same way as if it were using a callback or promise based API. The asynchronous I/O operations will still be processed in parallel and the code handling the responses in the async functions will not be executed until that asynchronous operation has a result. Also, even though you are using async/await you have to sooner or later resolve it as a Promise in the top level of your program. This is because async and await are just syntactical sugar for automatically creating, returning and resolving Promises.


第六篇：

https://medium.com/better-programming/should-i-use-promises-or-async-await-126ab5c98789


Thumb Rules for Using Promises：

1. Use promises whenever you are using asynchronous or blocking code.
2. resolve maps to then and reject maps to catch for all practical purposes.
3. Make sure to write both .catch and .then methods for all the promises.
4. If something needs to be done in both cases use .finally.
5. We only get one shot at mutating each promise.
6. We can add multiple handlers to a single promise.
7. The return type of all the methods in the Promise object, regardless of whether they are static methods or prototype methods, is again a Promise.
8. In Promise.all, the order of the promises are maintained in the values variable, irrespective of which promise was first resolved.

Once you have wrapped your head around promises, check out async-await. It helps you to write code that is much more readable. When it is not used properly, it has its downsides.


Thumb Rules for async-await

1. async functions return a promise.
2. async functions use an implicit Promise to return results. Even if you don’t return a promise explicitly, the async function makes sure that your code is passed through a promise.
3. await blocks the code execution within the async function, of which it (await statement) is a part.
4. There can be multiple await statements within a single async function.
5. When using async await, make sure you use try catch for error handling.
6. Be extra careful when using await within loops and iterators. You might fall into the trap of writing sequentially-executing code when it could have been easily done in parallel.
7. await is always for a single Promise.
8. Promise creation starts the execution of asynchronous functionality.
9. await only blocks the code execution within the async function. It only makes sure that the next line is executed when the promise resolves. So, if an asynchronous activity has already started, await will not have any effect on it.


Here are the thumb rules that I use to decide when to use promises and when to use async-await.

1. The async function returns a promise. The converse is also true. Every function that returns a promise can be considered as async function.
2. await is used for calling an async function and waits for it to resolve or reject.
3. await blocks the execution of the code within the async function in which it is located.
4. If the output of function2 is dependent on the output of function1, I use await.
5. If two functions can be run in parallel, create two different async functions and then run them in parallel.
6. To run promises in parallel, create an array of promises and then use Promise.all(promisesArray).
7. Every time you use await remember that you are writing blocking code. Over time we tend to neglect this.
8. Instead of creating huge async functions with many await asyncFunction() in it, it is better to create smaller async functions. This way, we will be aware of not writing too much blocking code.
9. Another advantage of using smaller async functions is that you force yourself to think of which async functions can be run in parallel.




















