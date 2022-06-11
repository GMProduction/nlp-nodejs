const hash = require("bcrypt");
const Model = require('../models');
const {
    User,
    Member,
    sequelize
} = Model;

export const loginPage = async (request, response) => {
    if (request.method === 'POST') {
        const {
            username,
            password
        } = request.body;
        console.log(request.body);
        const user = await User.findOne({
            where: {
                username: username,
            }
        });

        if (!user) {
            request.flash('error', 'user tidak di temukan');
            response.redirect('/login');
            return
        }

        const passwordMatch = await hash.compare(password, user.password);
        if (!passwordMatch) {
            request.flash('error', 'password tidak cocok');
            response.redirect('/login');
            return
        }
        console.log(user);
        let session = request.session;
        session.user = user;
        response.locals.user = {
            user: user.username,
            id: user.id
        };
        console.log(session);
        console.log(response.locals);
        response.redirect('/dashboard');
        return
    }
    response.render('login');
}

export const login = async (request, response) => {
    let session = request.session;
    const {
        username,
        password
    } = request.body;
    const user = await User.findOne({
        where: {
            username: username
        }
    });

    if (!user) {
        return response.status(202).json({
            code: 202,
            data: null,
            message: 'User Not Found!'
        })
    }

    const passwordMatch = await hash.compare(password, user.password);
    if (!passwordMatch) {
        return response.status(202).json({
            code: 202,
            data: null,
            message: 'Password Tidak Cocok'
        })
    }
    session.user = user;
    return response.status(200).json({
        code: 200,
        data: user,
        message: 'success'
    })
}

export const register = async (request, response) => {
    try {
        const {
            username,
            password,
            nama
        } = request.body;

        let _vPassword = await hash.hash(password, 13);
        let user = null;
        await sequelize.transaction(async (transaction) => {
            user = await User.create({
                username: username,
                password: _vPassword,
                roles: 'member',
                member: {
                    nama: nama
                }
            }, {
                transaction,
                include: [{
                    model: Member,
                    as: 'member'
                }]
            });
        });
        return response.status(200).json({
            code: 200,
            data: user
        })
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            code: 500,
            data: error.response
        })
    }
}