const Model = require('../models');
const {
    Transaction,
    Cart,
    User,
    Member
} = Model;

export const index = async (request, response) => {

    const data = await Transaction.findAll({
        include: [{
            model: Cart,
            as: 'cart'
        }, {
            model: User,
            as: 'user',
            include: [{
                model: Member,
                as: 'member'
            }]
        }]
    });
    response.render('dashboard', {
        data: data
    });
}