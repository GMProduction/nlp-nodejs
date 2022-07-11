const express = require('express');
const route = express.Router();
import {
    loginPage,
    login,
    register
} from "../controller/auth";
import {
    index
} from "../controller/dashboard";

route.get('/', loginPage);
route.post('/', loginPage);
route.get('/dashboard', index);
route.get('/cart', async (request, response) => {
    response.render('cart');
});
require('./web/auth')(route)
require('./web/admin')(route)
require('./web/member')(route)
require('./web/category')(route)
require('./web/item')(route)
require('./web/pesanan')(route)
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