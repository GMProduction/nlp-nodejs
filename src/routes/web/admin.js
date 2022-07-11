import {
    create,
    destroy,
    detail,
    findAll,
    index
} from '../../controller/admin';

import {
    web
} from '../../middleware/web';

module.exports = function (route) {
    route.get('/admin', index)
    route.get('/admin/create', create)
    route.post('/admin/create', create)
    route.get('/admin/:id/detail', detail)
    route.post('/admin/:id/detail', detail)
    route.get('/admin/data', findAll)
    route.post('/admin/:id/delete', destroy)
}