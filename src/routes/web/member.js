import {
    create,
    destroy,
    detail,
    findAll,
    index
} from '../../controller/member';

import {
    web
} from '../../middleware/web';

module.exports = function (route) {
    route.get('/member', index)
    route.get('/member/create', create)
    route.post('/member/create', create)
    route.get('/member/:id/detail', detail)
    route.post('/member/:id/detail', detail)
    route.get('/member/data', findAll)
    route.post('/member/:id/delete', destroy)
}