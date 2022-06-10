import {
    loginPage,
    login
} from '../../controller/auth';

module.exports = function (route) {
    route.get('/login', loginPage)
    route.post('/login', loginPage)
}