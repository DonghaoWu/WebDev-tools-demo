# Web development tools (Part 7)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Front-end`(Async - Promise)

### `Summary`: In this documentation, we learn Async & Promise.

### `Check Dependencies:`

- nodemon
- superagent

------------------------------------------------------------

#### `本章背景：`
- 

### <span id="7.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [7.1 Async function with callback.](#7.1)
- [7.2 Promise an async function.](#7.2)
- [7.3 What do async function and promise return?](#7.3)
- [7.4 Callback hell.](#7.4)
- [7.5 Promise a callback hell.](#7.5)
- [7.6 Deal with Promise.](#7.6)
- [7.7 A better way to consume Promise.](#7.7)


------------------------------------------------------------

### <span id="7.1">`Step1: Async function with callback.`</span>

- #### Click here: [BACK TO CONTENT](#7.0)

```js
const fs = require("fs");

const readFile = (file) => {
    fs.readFile(file, (err, data) => {
        console.log(`Breed:${data}`);
    })
}
```

#### `Comment:`
1. `fs.readFile`就是简单的 `async function with callback function` 的例子。`fs.readFile`也是 `Node` 内置的异步读取函数。

### <span id="7.2">`Step2: Promise an async function.`</span>

- #### Click here: [BACK TO CONTENT](#7.0)

```js
const fs = require("fs");

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find the file.');
            resolve(data);
        })
    })
}
```

#### `Comment:`
1. 这就是把一个 `async function` 的 `Promise化`，如果这样写：

```js
const x = readFilePro(`${__dirname}/dog.txt`);
console.log(x);
```

- 你会得到
```diff
+ Promise {<pending>}
```

2. 这里有一个很重要的认识，`async function`不会实时返回一个值，`Promise`会返回一个 pending promise。

3. 其他例子：
```js
const fs = require("fs");

// 普通定义，high order function 包住一个异步函数。
const writeFile = (file, message) => {
    fs.writeFile(file, message, err => {
        if (err) return console.log(err.message);
        console.log('Random dog image saved to file!');
    })
}

// 异步函数 Promise 化。
const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('I could not write the file.');
            resolve('success');
        })
    })
}
```

- 为什么要 `Promise` 化，不进行可不可以？
    1. 答案是可以的，`Promise` 化只是一个让代码看起来更顺畅的工具，实际机器运作的顺序是不变的，唯一变化的是 `Promise化` 让代码读起来更简洁更好操作。
    2. `Promise` 精简代码的最好例子是转化 `Callback hell`，在第三步介绍 `Callback hell`。
    3. 只有 `async function` 才需要 `Promise化`。

### <span id="7.3">`Step3: What do async function and promise return?`</span>

- #### Click here: [BACK TO CONTENT](#7.0)

```js
const fs = require("fs");

const readFile = (file) => {
    return fs.readFile(file, (err, data) => {
        console.log(`Breed:${data}`);
    })
}

const x = readFile(`${__dirname}/dog.txt`);
console.log(x); //---------> undefined
```

```js
const fs = require("fs");

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find the file.');
            resolve(data);
        })
    })
}

const y = readFilePro(`${__dirname}/dog.txt`);
console.log(y); //---------> promise
```

#### `Comment:`
1. 目前而言 async function 是没有返回值，Promise 返回 `Promise {<pending>}`，关于 async function 的返回值后面应该会有更多探讨（后更！）

### <span id="7.4">`Step4: Callback hell.`</span>

- #### Click here: [BACK TO CONTENT](#6.0)

1. 既然 `dispatch` 是用来派发 `actionCreator` 生成的对象，那么如果按照这个逻辑，如果我有一个 `async function` 返回一个对象，是不是可以通过直接 `dispatch` 这个对象从而完成任务，而不用使用 `thunk` 来实现？按照上面的想法，我写了这个：

```jsx
export const fetchMessages = () => {
    axios.get('/api/messages')
        .then(res => res.data)
        .then(messages => {
            return {
                action: GOT_MESSAGES_FROM_SERVER,
                payload: messages,
            }
        });
}
```

2. 以上结果是行不通的，具体原因未明。应该是跟 `promise` 是 `async action` 而不能返回 `object` 有关，实际使用中，上面这个 `fetchMessages()` 返回的是 `undefined`。

3. 后续跟进，需要补充 `promise` 和 `async function` 之后，估计可以使用 `promise` 的方法来实现。


#### `Comment:`
1. 

### <span id="6.6">`Step5: More materials.`</span>

- #### Click here: [BACK TO CONTENT](#6.0)

1. With thunkMiddleware, whenever we use store.dispatch, it will be a three-step process
  1. The store checks to see if the thing we passed to `dispatch` is a regular object or a function. 
    a. If it's a function, the store invokes that function immediately and passes the `dispatch` and `getState` methods to it as arguments. Do not move on to step 2.
    b. If it's a regular object, move on to step 2.
  2. The store invokes our reducer with the action and the previous state, and sets the return value 
    as the new state.
  3. The store invokes all listeners that have been registered with it (via `store.subscribe`).

2. Before, our reducer expected an action to be a plain JavaScript object with some identifying type field. However, thunk middleware will give us a powerful new ability: instead of dispatching an action object, we can dispatch a function! When thunkMiddleware sees that we've dispatched a function instead of a regular object, it will say,

  - Hey! This isn't a regular action! It's a function! I can't give this to the reducer, `so instead I'll invoke it and pass the store's dispatch method to it, so that whenever that side effect completes or the async action resolves, they can use it to dispatch a new action with whatever data they get.` (这句很重要，middlware 里面继续处理 async function，外面依然处理同步函数！)

3. `Thunk`: a function that we can pass to "store.dispatch" if we configure our store with "thunkMiddleware". If we dispatch a thunk, the thunk middleware will invoke the function and pass the store's "dispatch" and "getState" methods to it. Thunks are a desirable place to perform side effects (like AJAX requests) because it de-clutters our components, and because `they make it easy to eventually dispatch other actions when some asynchronous behavior resolves.`(这句很重要！)

4. Within our thunk function, we can perform all the side effects and AJAX we want. When we're done performing side effects, it is very likely that we will end up dispatching another action (or even another thunk), and the process repeats.


- #### Click here: [BACK TO CONTENT](#6.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)