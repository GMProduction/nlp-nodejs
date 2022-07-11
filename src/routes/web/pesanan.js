import {
    detail,
    index
} from '../../controller/pesanan';

import {
    web
} from '../../middleware/web';

module.exports = function (route) {
    route.get('/pesanan/', index)
    route.get('/pesanan/:id', detail)
    route.post('/pesanan/:id', detail)
}