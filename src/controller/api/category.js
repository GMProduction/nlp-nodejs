import {
    SuccessResponse,
    ErrorResponse
} from '../../lib/helper';

const Model = require('../../models');
const {
    Category
} = Model;

export const findAll = async (request, response) => {
    try {
        const data = await Category.findAll();
        return SuccessResponse(response, {
            payload: data
        });
    } catch (error) {
        return ErrorResponse(response, {
            message: error
        })
    }
}