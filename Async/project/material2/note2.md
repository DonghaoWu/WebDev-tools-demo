专业名词：

- Ajax
- async programming
- Javascript is full with async programming. Below are some of the examples.`(异步函数类型)`

    - AJAX Call
    - setTimeout or setInterval
    - Reading a file
    - Events

- async activity



- 为什么需要 callback？

    1. Why do we need callback :- We need callback because we don’t want to duplicate the ajax code every time we need. We want to create a generic ajax function which takes ajax details as input along with callback reference. After completing the call, it calls the callback so that caller can resume with the result of the ajax call.

    2. Callbacks are great way to separate the core logic of ajax with the rest of the application.

- 使用 callback 的坏处？

    1. But unfortunately, it becomes very difficult to handle callback when we do series of ajax calls where one call is dependent on previous call. We might encounter difficulty in maintaining multiple callback references and handling multiple success and error` conditions. Promise is a better way to manage multiple ajax calls. Let’s explore Promise next.

    2. Callback is easy to start with but certainly not the right direction. If you are new to javascript, you should know callback but should use promise.

    3. We end up with many nested callback functions that are dependent on the previous callback function. This is often referred to as a callback hell, as we end up with tons of nested callback functions that make the code quite difficult to read!

- 为什么使用 promise ？

    1. `Promise is used to overcome issues with multiple callbacks and provide better way to manage success and error conditions.` Promise looks little complex in the beginning but its very simple and effective to deal with. `Promise is an object which is returned by the async function like ajax.`

- promise 是怎样运作的？

    1. `Promise is used to overcome issues with multiple callbacks and provide better way to manage success and error conditions.` Promise looks little complex in the beginning but its very simple and effective to deal with. `Promise is an object which is returned by the async function like ajax.`

    2. There are two parts using a promise object. Inside async function (Part1) and where its called (Part2).
    Part1 — Inside Async function,
    - Promise object is created.
    - Async function returns the promise object
    - If async is done successfully, promise object is resolved by calling its resolve method.
    - If async is done with error, promise object is rejected by calling its rejected method.

    Part2 — Outside Async function
    - Call the function and get the promise object
    - Attach success handler, error handler on the promise object using `then method`

    `（在这里要标注的是 then 和 catch 都是 promise 的 build-in method， promise 本质上是一个 object。）`

    3. Promise object can be resolved or rejected only one time. We can add multiple success and error handlers on the promise object.

- promise 的返回值是什么？

    - The value of a promise, the value of [[PromiseValue]], is the value that we pass to the either the resolved or rejected method as their argument.`

    - 建造一个函数，这个函数返回一个 promise （这个例子不是很传统写法）

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

- promise 有什么内建函数？

    - .then(): Gets called after a promise resolved.
    - .catch(): Gets called after a promise rejected.
    - .finally(): Always gets called, whether the       promise resolved or rejected.

- `这里有一个很重要的认识，promise 就是一个 object，一个函数返回 promise，外部函数是无法使用 promise 里面生成的数据的，需要等整个 promise 完结之后才能使用，但这个时候原来设计的需要使用这个数据的同步函数已经在异步函数之前结束了。所以如果要使用 promise 链中的数据，只能在 .then 中运用。`

- Promise 的正式定义方式是怎样？

    ```js

    ```

    - `一个比较隐蔽的情况是，在定义 resolve 和 reject 时，对接的是 then 和 catch 内建函数，具体后面详细解释。`

    - The .then method receives the value passed to the resolve method.（这就类似一个内部定义函数间的数据接口）。

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
    2. setTimeout
    3. Promise.rsolve('Promise')
    4. console.log(`End!`);

    queue --->
    6. console.log('Promise');  >>> microtasks(Promise所在群组)
    7. console.log('Timeout!'); >>>`(macro)task queue`

    这里例子里面最好的设计就是把 setTimeout 的时间设计为 0.
    */
    ```

    

    4. 注意上面是有两个条件的，`以上也说明 async action 是放在 sync 动作之后执行的。` 当然在 async 中的 sync 函数有些情况是除外的，`(这里需要例子佐证)`

    ```js
    // 作证例子

    
- 如何使用 async 创造 async function ？

    1. With the introduction of the async and await keywords, we can create async functions that implicitly return a promise. 

    2. `这是个很重要的认识，所有用 async 定义的函数都是返回一个 promise`

- 使用 async 的好处：
    
    1. Although the fact that async functions implicitly return promises is pretty great, the real power of async functions can be seen when using the await keyword! With the await keyword, `we can suspend the asynchronous function while we wait for the awaited value return a resolved promise. If we want to get the value of this resolved promise, like we previously did with the then() callback, we can assign variables to the awaited promise value!` （这个过程就是 promise 完成了 resolve 然后 调用 then 的过程压缩了，只不过这里更好处理，可以把值放在 自定义变量上。）

- 调用 async 定义函数的执行顺序：

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

- 

