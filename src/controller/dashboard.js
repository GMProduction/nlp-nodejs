import {
    ErrorResponse,
    SuccessResponse
} from '../lib/helper';

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

export const data = async (request, response) => {

    try {
        const {
            status
        } = request.query;
        const data = await Transaction.findAll({
            where: {
                status: status
            },
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
        return SuccessResponse(response, {
            data: data
        });
    } catch (error) {
        return ErrorResponse(response, {
            data: []
        });
    }
}