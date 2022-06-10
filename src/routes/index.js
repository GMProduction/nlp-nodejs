const express = require('express');
const route = express.Router();
import {
    loginPage,
    login,
    register
} from "../controller/auth";

route.get('/', async (request, response) => {
    response.render('index');
});
route.get('/cart', async (request, response) => {
    response.render('cart');
});
require('./web/auth')(route)
// require('./nlp-answer')(route)
// require('./nlp-question')(route)
// require('./nlp')(route)

// route.post('/api/login', login);
// route.post('/api/register', register);

module.exports = route;