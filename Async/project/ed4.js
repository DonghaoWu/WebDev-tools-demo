const fs = require("fs");
const superagent = require("superagent");

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find the file.');
            resolve(data);
        })
    })
}

// Lv1, 最原始的 call back hell。
const example1 = () => {
    fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
        console.log(`2`);
        console.log(`Breed:${data}`);

        // ‘superagent.get’ return promise
        superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
            .then(res => {
                console.log(res.body.message);

                fs.writeFile('dog-img.txt', res.body.message, err => {
                    console.log('Random dog image saved to file!');
                })
            })
            .catch(err => {
                console.log(err.message);
            })
    })
}

// fs.readFile => call back function, superagent.get => promise, fs.writeFile => call back function.
// 把一个 async function 放在另外一个 promise 代码内，也能保证调用顺序。
// 这个版本是一个简易版本，先把一个 promise 里面包含的 call back function 用 .then 和 .catch 处理。
// 关于把一个 call back function 转化成 promise

example1();