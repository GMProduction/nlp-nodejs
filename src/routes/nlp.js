import {
    viewPage,
    executeNLP
} from '../controller/nlp';

module.exports = function (route) {
    route.get('/nlp', viewPage)
    route.post('/api/nlp/execute', executeNLP)
}