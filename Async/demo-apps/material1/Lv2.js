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
}

example2();