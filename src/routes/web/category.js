import {
    create,
    destroy,
    detail,
    findAll,
    index
} from '../../controller/category';

import {
    web
} from '../../middleware/web';

module.exports = function (route) {
    route.get('/category', index)
    route.get('/category/create', create)
    route.post('/category/create', create)
    route.get('/category/:id/detail', detail)
    route.post('/category/:id/detail', detail)
    route.get('/category/data', findAll)
    route.post('/category/:id/delete', destroy)
}