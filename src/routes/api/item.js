import {
    findAll,
    findById
} from '../../controller/api/item';

import {
    auth
} from "../../middleware/api";
module.exports = function (route) {
    route.get('/api/item', auth, findAll)
    route.get('/api/item/:id', auth, findById)
}