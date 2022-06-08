const express = require('express');
const route = express.Router();
import {
    loginPage,
    login
} from "../controller/auth";

require('./nlp-answer')(route)
require('./nlp-question')(route)
require('./nlp')(route)
route.get('/', loginPage);
route.post('/', login);

module.exports = route;