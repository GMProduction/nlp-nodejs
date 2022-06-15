const express = require('express');
const route = express.Router();
import {
    loginPage,
    login,
    register
} from "../controller/auth";

route.get('/', loginPage);
route.post('/', loginPage);
route.get('/dashboard', (req, res) => {
    res.render('index');
});
route.get('/cart', async (request, response) => {
    response.render('cart');
});
require('./web/auth')(route)
require('./web/category')(route)
require('./web/item')(route)
require('./api/auth')(route)
require('./api/category')(route)
require('./api/item')(route)
require('./api/cart')(route)
require('./api/transaction')(route)
// require('./nlp-answer')(route)
// require('./nlp-question')(route)
// require('./nlp')(route)

// route.post('/api/login', login);
// route.post('/api/register', register);

module.exports = route;