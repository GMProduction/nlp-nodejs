import {
    SuccessResponse,
    ErrorResponse
} from '../lib/helper';
const hash = require("bcrypt");

const Model = require('../models');
const {
    User
} = Model;

export const findAll = async (request, response) => {
    try {
        const data = await User.findAll({
            where: {
                roles: 'admin'
            }
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

export const index = async (request, response) => {

    const data = await User.findAll({
        where: {
            roles: 'admin'
        }
    });
    console.log(data);
    response.render('admin/index', {
        data: data
    });
}

export const create = async (request, response) => {
    if (request.method === 'POST') {
        try {
            const {
                username,
                password
            } = request.body;
            let _password = await hash.hash(password, 13);
            await User.create({
                username: username,
                password: _password,
                roles: 'admin'
            });
            request.flash('success', 'Success');
            response.redirect('/admin/create');
            return
        } catch (error) {
            request.flash('error', 'Terjadi Kesalahan');
            response.redirect('/admin/create');
            return
        }
    }
    response.render('admin/add');
}

export const detail = async (request, response) => {
    let id = request.params.id;
    const data = await User.findOne({
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
            username,
            password
        } = request.body;
        let param = {
            username: username
        };

        if (password !== '') {
            let _password = await hash.hash(password, 13);
            param['password'] = _password
        }
        await data.update(param);
        request.flash('success', 'Success');
        response.redirect('/admin');
        return
    }
    response.render('admin/edit', {
        data: data
    });
}

export const destroy = async (request, response) => {
    try {
        let id = request.params.id;
        await User.destroy({
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