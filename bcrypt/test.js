const bcrypt = require('bcrypt-nodejs');
const hash = bcrypt.hashSync(`123`);


bcrypt.hash("123", null, null, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash);
});

// Load hash from your password DB.
bcrypt.compare("123", hash, function(err, res) {
    console.log(res)
});


