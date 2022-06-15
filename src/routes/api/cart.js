import {
    findAll,
    create,
    checkout
} from '../../controller/api/cart';

import {
    auth
} from "../../middleware/api";
module.exports = function (route) {
    route.get('/api/cart', auth, findAll)
    route.post('/api/cart', auth, create)
    route.post('/api/cart/checkout', auth, checkout)
}