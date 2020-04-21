const fs = require("fs");
const superagent = require("superagent");

// 以下就是一个 async function
const readFile = (file) => {
    return fs.readFile(file, (err, data) => {
        console.log(`2`);
        console.log(`Breed:${data}`);
    })
}

console.log(`1`);
const x = readFile(`${__dirname}/dog.txt`);
console.log(x);
console.log(`3`);

// 运行顺序，1 =》 example1（） =》 3 => fs.readFile() 完成 =》2 =》 breed：retriver


// const x = fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`2`);
//     console.log(`Breed:${data}`);
// })

// console.log(x);
