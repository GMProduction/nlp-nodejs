const express = require('express');
const route = express.Router();

require('./nlp-answer')(route)
require('./nlp-question')(route)
require('./nlp')(route)
route.get('/', (req, res) => {
    res.send('Hoi');
});

module.exports = route;