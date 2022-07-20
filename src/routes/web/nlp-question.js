import {
    create,
    destroy,
    detail,
    index
} from '../../controller/nlp-question';

import {
    web
} from '../../middleware/web';

module.exports = function (route) {
    route.get('/nlp-question', index)
    route.get('/nlp-question/create', create)
    route.post('/nlp-question/create', create)
    route.get('/nlp-question/:id/detail', detail)
    route.post('/nlp-question/:id/detail', detail)
    // route.get('/nlp-answer/data', findAll)
    route.post('/nlp-question/:id/delete', destroy)
}