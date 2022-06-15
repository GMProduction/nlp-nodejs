import {
    index,
    create,
    detail,
    destroy
} from '../../controller/item';
module.exports = function (route) {
    route.get('/item', index)
    route.get('/item/create', create)
    route.post('/item/create', create)
    route.get('/item/:id/detail', detail)
    route.post('/item/:id/detail', detail)
    route.post('/item/:id/delete', destroy)
}