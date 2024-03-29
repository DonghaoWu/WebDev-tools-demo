# Web development tools (Part 7)

### `Key Word: calback function order, promise, callback hell, 函数 promise 化, async mode.`


- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Front-end`(Async - Promise)

### `Summary`: In this documentation, we learn Async & Promise.

### `Check Dependencies & Tools:`

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
- [7.6 Consume Promise in async mode.](#7.6)
- [7.7 More about async function.](#7.7)


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
1. 这就是把一个 `async function` 的 `Promise 化`，如果这样写：

    ```js
    const x = readFilePro(`${__dirname}/dog.txt`);
    console.log(x);
    ```

    - 你会得到
    ```diff
    + Promise {<pending>}
    ```

2. 这里有一个很重要的认识，readFilePro 是一个生成 promise 的函数，而 Promise 是一个特定 object。之所以会出现 `pending` 的情况是因为这是一个同步执行的顺序它只检测到这是一个 promise 而没有等它结束就执行下一行代码。当然也有不是 pending 的情况，但是它必须是一个 promise。

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
        1. Promise 化是因为使 callback 方案的代码更容易懂和更容易维护。
        2. `Promise` 精简代码的最好例子是转化 `Callback hell`，在第三步介绍 `Callback hell`。
        3. `async function` 都可以 `Promise 化`。

4. 学习 `Promise` 的写法需要清楚语法，需要产出什么，还有包含一个异步动作。

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
    console.log(x); //---------> undefined，因为 fs.readFile 不返回任何值。
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
1. 目前而言 async function 在同步模式下是没有返回值，Promise 在同步模式下返回 `Promise {<pending>}`，async function 里面就算是 callback 最后返回的值也不会使用在同步环境之中，因为 callback 是在所有同步函数结束之后才执行的。

### <span id="7.4">`Step4: Callback hell.`</span>

- #### Click here: [BACK TO CONTENT](#7.0)

    ```js
    const superagent = require("superagent");

    const example1 = () => {
        fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
            console.log(`Breed:${data}`);

            superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
                if (err) return console.log(err.message);
                console.log(res.body.message);

                fs.writeFile('dog-img.txt', res.body.message, err => {
                    if (err) return console.log(err.message);
                    console.log('Random dog image saved to file!');
                })
            })
        })
    };

    example1();
    ```

#### `Comment:`
1. 在 `example1` 中，一共运行了3个异步动作，其中：
    - `fs.readFile` 是 `async function`;
    - `superagent.get` 运行后返回的是 `promise`;
    - `fs.writeFile` 是 `async function`;

2. 以上通过层叠嵌套方式把 `async function` 跟 `promise` 结合起来，实行了3个异步动作的`有序执行`。

3. 但是这种形式表达有点繁琐，且调试起来吃力，同时每个动作都要写 error handling，所以叫做 `callback hell`。

4. 一个很重要的认识是，没有 `promise` 的最原始方案（callback）都可以实现多个异步动作的`按序执行`。

### <span id="7.5">`Step5: Promise a callback hell.`</span>

- #### Click here: [BACK TO CONTENT](#7.0)

    ```js
    const fs = require("fs");
    const superagent = require("superagent");

    const readFilePro = file => {
        return new Promise((resolve, reject) => {
            fs.readFile(file, (err, data) => {
                if (err) reject({ message: 'I could not find the file.' });
                resolve(data);
            })
        })
    }

    const writeFilePro = (file, data) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(file, data, err => {
                if (err) reject({ message: 'I could not write the file.' });
                resolve('success');
            })
        })
    }

    const example2 = () => {
        readFilePro(`${__dirname}/dog.txt`)
            .then(data => {
                console.log(`Breed:${data}`);
                return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
            }).then(res => {
                console.log(res.body.message);
                return writeFilePro('dog-img.txt', res.body.message);
            })
            .then(() => {
                console.log('Random dog image saved to file!')
            })
            .catch(err => {
                console.log(err.message);
            })
    };

    example2();
    ```

#### `Comment:`
1. 在 `example2` 中，一共运行了3个异步动作，其中：
    - `readFilePro` 运行后返回的是 `promise`;
    - `superagent.get` 运行后返回的是 `promise`;
    - `writeFilePro` 运行后返回的是 `promise`;

2. 在这里有两个比较难懂的点，第一个是`.then`后面意味着什么，它是 promise 的一个自带 method，类似 callback，它对应的是 promise 定义时 resolve 包含的参数。:star:只有 promise 才可以使用 .then。

3. 第二个难点是在 `promise` 之前使用 `return` 关键词，这是因为在处理 `promise` 链条时，如果想在上一个 `promise` 成功后把数据用于下一个 `promise`，需要做的是调用当下的 `promise` 并使用 `return` 关键词，整个意思是运行一个 `promise` 并返回这个 `promise` 的结果交给 `.then`或`.catch` 处理。

4. 使用这种处理 `promise` 方法的另外一个好处是把错误集中处理并简化代码，可以看到在`example1`中需要使用多个`if ... return`去进行打断处理，比较重复。

### <span id="7.6">`Step6: Consume Promise in async mode.`</span>

- #### Click here: [BACK TO CONTENT](#7.0)

    ```js
    const fs = require("fs");
    const superagent = require("superagent");

    const readFilePro = file => {
        return new Promise((resolve, reject) => {
            fs.readFile(file, (err, data) => {
                if (err) reject({ message: 'I could not find the file.' });
                resolve(data);
            })
        })
    }

    const writeFilePro = (file, data) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(file, data, err => {
                if (err) reject({ message: 'I could not write the file.' });
                resolve('success');
            })
        })
    }

    const example3 = async () => {
        try {
            // stop the code here and wait for the promise finish. stop ... until

            const data = await readFilePro(`${__dirname}/dog.txt`); //await 后面跟 promise，之后的代码相当于从这里开始进入了 promise 链。
            console.log(`Breed:${data}`);

            const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
            console.log(res.body.message);
            await writeFilePro('dog-img.txt', res.body.message);
            console.log('Random dog image saved to file!');
        } catch (error) {
            console.log(error.message);
        }
    };

    example3();
    ```

#### `Comment:`
1. 第一个必须注明的是，这只是一种新的形式去处理`async action/ promise`。`example3`写法更好理解和维护，但是后台执行的原理跟`example1`和`example2`一模一样。其实这里使用的还是处理 promise 的方法，只是形式改变了，底下执行的原理跟原生 promise 一样。

2. 使用 `async` 定义的函数，表示里面可以使用关键词`await`和`try catch`。
3. :star: 目前从代码上面看，`await` 后面是必须跟一个 `promise`的，所以必须要把异步函数先`promise`化。`await`的意思是等待这个`promise`成功完成，有返回值的话就赋值，__`且之后的所有语句都自动进入 promise 链条。`__
4. 可以看出，在异步模式下加上`async`和`await`就可以使`promise`返回一个值，不过这个异步模式的赋值不能用在同步模式的执行上，因为执行模式不一样，所以跟同步函数的运行和思考模式不一样。操作模式不一样，对应的结果也难互相使用，当然同步函数的值可以使用在异步函数中。

5. 目前为止，提到几个比较容易混淆的单词：同步函数，异步函数，同步模式，异步模式，同步动作，异步动作，同步输出，异步输出。后面需要继续解释，理清概念边界。（4月20日）

6. 总的来说，`async function` 加上`Promise` 定义生成`promise`，`async/await` 和 `.then/.catch` 是处理 promise 的两种形式。

### <span id="7.7">`Step7: More about async function.`</span>

- #### Click here: [BACK TO CONTENT](#7.0)
- #### Click here: [Part8: Async-Research (doc)](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/Async/Async-Research(doc).md)

- #### Click here: [Part9: Async-Research (code)](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/Async/Async-Research(code).md)

#### `Comment:`
1. 4月20日，目前来看，一个函数里面如果有 `async function`或者`promise`,那么整个函数就是 `async fucntion`，Node 会使用异步方式执行整个函数。（这个观点是不正确的，async 里面的同步动作还是会直接执行的，4月28日。）
2. :question:使用 `async` 定义的函数，返回值一定是一个`promise`，所以可以跟着用 .then 和 .catch。

3. 待补充材料：`throw` & `promise.all`

- #### Click here: [BACK TO CONTENT](#7.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)