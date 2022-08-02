const express = require('express');
const route = express.Router();
import {
    loginPage,
    login,
    register
} from "../controller/auth";
import {
    index,
    data
} from "../controller/dashboard";

const pdfService = require('../controller/pdf-service');
route.get('/pdf', async (request, response) => {
    // const stream = response.writeHead(200, {
    //     'Content-type': 'application/pdf',
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Disposition': 'attachment;filename=abc.pdf'
    // });

    pdfService.buildPDF(
        (chunk) => {},
        () => {},
        response
    )
});
route.get('/logout', async (request, response) => {
    response.redirect('/');
});
route.get('/', loginPage);
route.post('/', loginPage);
route.get('/dashboard', index);
route.get('/dashboard/data', data);
route.get('/cart', async (request, response) => {
    response.render('cart');
});
require('./web/auth')(route)
require('./web/admin')(route)
require('./web/member')(route)
require('./web/category')(route)
require('./web/item')(route)
require('./web/nlp-answer')(route)
require('./web/nlp-question')(route)
require('./web/pesanan')(route)
require('./api/auth')(route)
require('./api/category')(route)
require('./api/item')(route)
require('./api/cart')(route)
require('./api/transaction')(route)
// require('./nlp-answer')(route)
// require('./nlp-question')(route)
require('./nlp')(route)

// route.post('/api/login', login);
// route.post('/api/register', register);

module.exports = route;