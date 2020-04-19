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

// const getDogPic = async () => {
//     try {
//         const data = await readFilePro(`${__dirname}/dog.txt`);
//         console.log(`Breed:${data}`);
//         const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//         console.log(res.body.message);
//         await writeFilePro('dog-img.txt', res.body.message);
//         console.log('Random dog image saved to file!');
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// console.log(`1`);
// getDogPic();
// console.log(`2`);

// 这一章正式提到 async function 的内在运行顺序。 1=》2=》promise。。。
// async run in the background. the execution does not stop.


// const getDogPic = async () => {
//     try {
//         const data = await readFilePro(`${__dirname}/dog.txt`);
//         console.log(`Breed:${data}`);
//         const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//         console.log(res.body.message);
//         await writeFilePro('dog-img.txt', res.body.message);
//         console.log('Random dog image saved to file!');
//     } catch (error) {
//         console.log(error.message);
//     }
//     return `2`;
// }

// console.log(`1`);
// const x = getDogPic();
// console.log(x);
// console.log(`3`);

// 1 => Promise pending => 3
// 当你标记了一个 function 为 async 之后，他返回的一定是一个 promise。
// 运行顺序 应该是 1，然后 getDogPic，然后发现这个 function 有 async 标志，就算里面有同步语句 return `2`，也都一律返回 一个 pending 状态的 promise。

// const getDogPic = async () => {
//     try {
//         const data = await readFilePro(`${__dirname}/dog.txt`);
//         console.log(`Breed:${data}`);
//         const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//         console.log(res.body.message);
//         await writeFilePro('dog-img.txt', res.body.message);
//         console.log('Random dog image saved to file!');
//     } catch (error) {
//         console.log(error.message);
//     }
//     return `2`;
// }

// console.log(`1`);
// getDogPic().then(x => {
//     console.log(x);
//     console.log(`3`);
// });

// 这里很中意一个认识是，await 只适用于 promise ，async function 的调用是直接调用的，返回一个 promise。
// 以上观点不完全正确，async function 返回的也是一个 promise，所以 用 await + async function 是可以得到 async 里面返回的值。
// 目前而言，在 async 里面定义的返回变量是无法在外部定义获得的，如上面 // const x = getDogPic();
// 要解决第二步的问题，可以大胆这样尝试：

// const testOne = async () => {
//     console.log(`1`);
//     const x = await getDogPic();
//     console.log(x);
//     console.log(`3`);
// }

// testOne();


// const getDogPic = async () => {
//     try {
//         const data = await readFilePro(`${__dirname}/dog.txt`);
//         console.log(`Breed:${data}`);
//         const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//         console.log(res.body.message);
//         await writeFilePro('dog-img.txt', res.body.message);
//         console.log('Random dog image saved to file!');
//     } catch (error) {
//         console.log(error.message);
//         throw (error);
//     }
//     return `2`;
// }

// console.log(`1`);
// getDogPic().then(x => {
//     console.log(x);
//     console.log(`3`);
// }).catch(error =>{
//     console.log('ERROR!!!!');
// });

// 利用 throw 打断整个链条。可以通过修改观察。

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed:${data}`);
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);
        await writeFilePro('dog-img.txt', res.body.message);
        console.log('Random dog image saved to file!');
    } catch (error) {
        console.log(error.message);
        throw (error);
    }
    return `2`;
}

(async () => {
    try {
        console.log(`1`);
        const x = await getDogPic();
        console.log(x);
        console.log(`3`);
    } catch (error) {
        console.log('ERROR!!!!');
    }
})();

// recap: async returns a promise, the value of the promise will be the resolve data.(most important!!!!)