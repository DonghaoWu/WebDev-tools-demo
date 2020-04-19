const fs = require("fs");
const superagent = require("superagent");

// Lv1, 最原始的 call back hell。
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
}

// 备注：这里面有3个 async functin，运行顺序是 fs.readFile => superagent => writeFile
// 设计原理是把一个 call back function 放在另一个 call back function 的代码里面。

