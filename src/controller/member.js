import {
    SuccessResponse,
    ErrorResponse
} from '../lib/helper';
const hash = require("bcryptjs");

const Model = require('../models');
const {
    User,
    Member,
    sequelize
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
            roles: 'member'
        },
        include: [{
            model: Member,
            as: "member",
        }, ]
    });
    console.log(data);
    response.render('member/index', {
        data: data
    });
}

export const create = async (request, response) => {
    if (request.method === 'POST') {
        const t = await sequelize.transaction();
        try {
            const {
                username,
                password,
                nama
            } = request.body;

            let _password = await hash.hash(password, 13);

            await User.create({
                username: username,
                password: _password,
                roles: 'member',
                member: {
                    nama: nama
                }
            }, {
                transaction: t,
                include: [{
                    model: Member,
                    as: "member",
                }, ],
            })
            await t.commit();
            request.flash('success', 'Success');
            response.redirect('/member/create');
            return
        } catch (error) {
            await t.rollback();
            request.flash('error', 'Terjadi Kesalahan');
            response.redirect('/member/create');
            return
        }
    }
    response.render('member/add');
}

export const detail = async (request, response) => {
    let id = request.params.id;
    const data = await User.findOne({
        where: {
            id,
        },
        include: [{
            model: Member,
            as: "member",
        }, ]
    });
    if (!data) {
        response.send("Halaman Tidak Di Temukan")
        return
    }

    if (request.method === 'POST') {
        const t = await sequelize.transaction();
        try {
            const {
                username,
                password,
                nama
            } = request.body;
            let param = {
                username: username,
            };

            if (password !== '') {
                let _password = await hash.hash(password, 13);
                param['password'] = _password
            }
            await data.update(param);
            await data.member.update({
                nama: nama
            });

            await t.commit();
            request.flash('success', 'Success');
            response.redirect('/member');
            return
        } catch (error) {
            await t.rollback();
            console.log(error);
            request.flash('error', 'Terjadi Kesalahan');
            response.redirect('/member/' + id + '/detail');
            return
        }

    }
    response.render('member/edit', {
        data: data
    });
}

export const destroy = async (request, response) => {
    const t = await sequelize.transaction();
    try {
        let id = request.params.id;
        await Member.destroy({
            where: {
                user_id: id
            }
        })
        await User.destroy({
            where: {
                id
            }
        })
        await t.commit();
        return SuccessResponse(response)
    } catch (error) {
        await t.rollback();
        return ErrorResponse(response, {
            message: error
        })
    }
}