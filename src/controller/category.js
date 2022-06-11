import {
    SuccessResponse,
    ErrorResponse
} from '../lib/helper';

const Model = require('../models');
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

export const index = async (request, response) => {

    const data = await Category.findAll();
    console.log(data);
    response.render('category/index', {
        data: data
    });
}

export const create = async (request, response) => {
    if (request.method === 'POST') {
        try {
            const {
                nama
            } = request.body;
            await Category.create({
                nama: nama
            });
            request.flash('success', 'Success');
            response.redirect('/category/create');
            return
        } catch (error) {
            request.flash('error', 'Terjadi Kesalahan');
            response.redirect('/category/create');
            return
        }
    }
    response.render('category/add');
}

export const detail = async (request, response) => {
    let id = request.params.id;
    const data = await Category.findOne({
        where: {
            id,
        },
    });
    if (!data) {
        response.send("Halaman Tidak Di Temukan")
        return
    }

    if (request.method === 'POST') {
        const {
            nama
        } = request.body;
        await data.update({
            nama: nama
        });
        request.flash('success', 'Success');
        response.redirect('/category');
        return
    }
    response.render('category/edit', {
        data: data
    });
}

export const destroy = async (request, response) => {
    try {
        let id = request.params.id;
        await Category.destroy({
            where: {
                id
            }
        })
        return SuccessResponse(response)
    } catch (error) {
        return ErrorResponse(response, {
            message: error
        })
    }
}