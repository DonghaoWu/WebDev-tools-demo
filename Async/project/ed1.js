const fs = require("fs");
const superagent = require("superagent");

// 以下就是一个 async function
const example1 = () => {
    fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
        console.log(`2`);
        console.log(`Breed:${data}`);
    })
}

console.log(`1`);
example1();
console.log(`3`);

// 运行顺序，1 =》 example1（） =》 3 => fs.readFile() 完成 =》2 =》 breed：retriver



