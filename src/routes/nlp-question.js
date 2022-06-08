import {
    findAll
} from '../controller/nlp-question';

module.exports = function (route) {
    route.get('/nlp-question', findAll)
}