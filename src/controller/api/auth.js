const hash = require("bcrypt");
const Model = require('../../models');
const JWT = require("jsonwebtoken");
const {
    User,
    Member,
    sequelize
} = Model;

import {
    SuccessResponse,
    ErrorResponse,
    ItemNotFoundResponse
} from '../../lib/helper';

export const register = async (request, response) => {
    const t = await sequelize.transaction();
    try {
        const {
            username,
            password,
            nama
        } = request.body;

        let _password = await hash.hash(password, 13);

        const _user = await User.create({
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

        let token = JWT.sign({
            id: _user.id,
            username: _user.username,
            roles: 'member'
        }, "SANGGOROSECRETKEY");
        await t.commit();
        return SuccessResponse(response, {
            accessToken: token
        })
    } catch (error) {
        await t.rollback();
        return ErrorResponse(response, {
            message: `failed ${error}`
        })
    }
}

export const login = async (request, response) => {
    try {
        const {
            username,
            password
        } = request.body;
        const _user = await User.findOne({
            where: {
                username: username
            }
        });

        if (!_user) {
            return ItemNotFoundResponse(response, {
                message: "User Not Found!",
            });
        }

        const passwordMatch = await hash.compare(password, _user.password);
        if (!passwordMatch) {
            return ItemNotFoundResponse(response, {
                message: "Password Not Match",
            });
        }

        let token = JWT.sign({
            id: _user.id,
            username: _user.username,
            roles: 'member'
        }, "SANGGOROSECRETKEY");

        return SuccessResponse(response, {
            accessToken: token
        })
    } catch (error) {
        return ErrorResponse(response, {
            message: `failed ${error}`
        })
    }
}