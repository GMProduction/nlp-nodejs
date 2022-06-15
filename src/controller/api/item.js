import {
    SuccessResponse,
    ErrorResponse
} from '../../lib/helper';

const Model = require('../../models');
const {
    Category,
    Item
} = Model;
const {
    Op
} = require("sequelize");

export const findAll = async (request, response) => {
    try {
        const {
            name
        } = request.query;
        let config = {
            include: [{
                model: Category,
                as: "category"
            }]
        };
        if (name !== undefined) {
            config['where'] = {
                nama: {
                    [Op.like]: `%${name}%`,
                },
            };
        }
        const data = await Item.findAll(config);
        return SuccessResponse(response, {
            payload: data
        });
    } catch (error) {
        return ErrorResponse(response, {
            message: error
        })
    }
}

export const findById = async (request, response) => {
    try {
        let id = request.params.id;
        const data = await Item.findOne({
            where: {
                id
            },
            include: [{
                model: Category,
                as: "category"
            }]
        });
        return SuccessResponse(response, {
            payload: data
        });
    } catch (error) {
        return ErrorResponse(response, {
            message: error
        })
    }
}