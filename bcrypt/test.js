const bcrypt = require('bcrypt-nodejs');
const hash = bcrypt.hashSync(`1`);

console.log(hash);

// Load hash from your password DB.
bcrypt.compare("1", hash, function(err, res) {
    console.log(res)
});


