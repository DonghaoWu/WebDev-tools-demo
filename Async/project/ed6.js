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
// async 意味着你可以使用 await 和 try catch 了。 comsuming promise all the time。
// 标记了 async 之后，不会打断其他同步函数应有的顺序（event loop），而是走了 async 异步流程。但是这个 async 里面如果用到 await 的话，对应的 promise 也一定是 同步的。
const getDogPic = async () => {
    try {
        // stop the code here and wait for the promise finish. stop ... until
        const data = await readFilePro(`${__dirname}/dog.txt`); //await 后面必须放的是一个 promise， 等待这个过程完成。
        console.log(`Breed:${data}`);
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);
        await writeFilePro('dog-img.txt', res.body.message);
        console.log('Random dog image saved to file!');
    } catch (error) {
        console.log(error.message);
    }
}

getDogPic();

// readFilePro(`${__dirname}/dog.txt`)
//     .then(data => {
//         console.log(`Breed:${data}`);
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     }).then(res => {
//         console.log(res.body.message);
//         return writeFilePro('dog-img.txt', res.body.message);
//     })
//     .then(() => {
//         console.log('Random dog image saved to file!')
//     })
//     .catch(err => {
//         console.log(err.message);
//     })