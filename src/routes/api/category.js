import {
    findAll
} from '../../controller/api/category';

import {
    auth
} from "../../middleware/api";
module.exports = function (route) {
    route.get('/api/category', auth, findAll)
}