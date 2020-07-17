// routes/index.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { quote, source, attributed } = req.body;
    res.render('index', {
        quote: quote,
        source: source,
        attributed: attributed
    });

});

router.get('/', (req, res) => {
    res.render('index');
})

module.exports = router;
