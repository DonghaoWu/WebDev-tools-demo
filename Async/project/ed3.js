const fs = require("fs");
const superagent = require("superagent");

// 以下就是一个 async function
const example1 = () => {
    fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
        console.log(`2`);
        console.log(`Breed:${data}`);

        superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
            console.log(res.body.message);
        })
    })
}

const example2 = () => {
    fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
        console.log(`2+`);
        console.log(`Breed:${data}`);

        superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
            console.log(res.body.message);
        })
    })
}

console.log(`1`);
example1();
example2();
console.log(`3`);

// 运行顺序，
// 1 =》 example1（） =》 3 => fs.readFile() 完成 =》2 =》 breed：retriver => superagent.get() => superagent.get() 完成 =》 res.body.message