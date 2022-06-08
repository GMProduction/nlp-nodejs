import {
    findAll
} from '../controller/nlp-answer';

module.exports = function (route) {
    route.get('/nlp-answer', findAll)
}