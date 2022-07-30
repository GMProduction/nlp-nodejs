import {
    SuccessResponse,
    ErrorResponse,
    ItemNotFoundResponse
} from '../../lib/helper';

const Model = require('../../models');
const {
    Cart,
    Item,
    Category,
    Transaction,
    sequelize
} = Model;
const {
    Op
} = require("sequelize");

export const findAll = async (request, response) => {
    try {
        const {
            id
        } = request.user;
        const {
            status
        } = request.query;
        const data = await Transaction.findAll({
            where: {
                user_id: id,
                status: status
            },
            include: [{
                model: Cart,
                as: 'cart',
                include: [{
                    model: Item,
                    as: 'item',
                    include: [{
                        model: Category,
                        as: 'category'
                    }]
                }]
            }]
        })
        return SuccessResponse(response, {
            payload: data
        })
    } catch (error) {
        return ErrorResponse(response, {
            message: `failed ${error}`
        })
    }
}

export const findById = async (request, response) => {
    try {
        const {
            id
        } = request.user;
        let transaction_id = request.params.id;
        const data = await Transaction.findOne({
            where: {
                user_id: id,
                id: transaction_id
            },
            include: [{
                model: Cart,
                as: 'cart',
                include: [{
                    model: Item,
                    as: 'item',
                    include: [{
                        model: Category,
                        as: 'category'
                    }]
                }]
            }]
        })
        return SuccessResponse(response, {
            payload: data
        })
    } catch (error) {
        return ErrorResponse(response, {
            message: `failed ${error}`
        })
    }
}