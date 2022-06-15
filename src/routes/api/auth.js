import {
    register,
    login
} from '../../controller/api/auth';

module.exports = function (route) {
    route.post('/api/register', register)
    route.post('/api/login', login)
}