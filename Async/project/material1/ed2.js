const fs = require("fs");
const superagent = require("superagent");

// 以下就是一个 async function
const example1 = () => {
    fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
        console.log(`2`);
        console.log(`Breed:${data}`);

        superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
            if (err) return console.log(err.message)
            console.log(res.body.message);

            fs.writeFile('dog-img.txt', res.body.message, err => {
                console.log('Random dog image saved to file!');
            })
        })
    })
}

console.log(`1`);
example1();
console.log(`3`);

// 运行顺序，
// 1 =》 example1（） =》 3 => fs.readFile() 完成 =》2 =》 breed：retriver => superagent.get() => superagent.get() 完成 =》 res.body.message

// 暂时来说，如果只加插一个 async function，行为还是可以预测的。但如果加插多个 async funciton 在 1 和 3 之间，运行结果是很难预测的了，具体看 ed3.

// 初期阶段来说，如果想两个 async function 分先后执行，解决方案是把一个 async function 放到另一个 async function 里面。