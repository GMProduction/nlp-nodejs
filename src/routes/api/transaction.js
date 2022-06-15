import {
    findAll,
    findById
} from '../../controller/api/transaction';

import {
    auth
} from "../../middleware/api";
module.exports = function (route) {
    route.get('/api/transaction', auth, findAll)
    route.get('/api/transaction/:id', auth, findById)
}