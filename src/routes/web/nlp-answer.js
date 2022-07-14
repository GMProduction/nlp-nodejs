import {
    create,
    // destroy,
    detail,
    // findAll,
    index
} from '../../controller/nlp-answer';

import {
    web
} from '../../middleware/web';

module.exports = function (route) {
    route.get('/nlp-answer', index)
    route.get('/nlp-answer/create', create)
    route.post('/nlp-answer/create', create)
    route.get('/nlp-answer/:id/detail', detail)
    route.post('/nlp-answer/:id/detail', detail)
    // route.get('/nlp-answer/data', findAll)
    // route.post('/nlp-answer/:id/delete', destroy)
}