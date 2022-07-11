const Model = require('../models');
const {
    Transaction,
    Cart,
    User,
    Member,
    Item
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
    response.render('pesanan/index', {
        data: data
    });
}

export const detail = async (request, response) => {
    let id = request.params.id;
    const data = await Transaction.findOne({
        where: {
            id: id
        },
        include: [{
            model: Cart,
            as: 'cart',
            include: [{
                model: Item,
                as: 'item'
            }]
        }, {
            model: User,
            as: 'user',
            include: [{
                model: Member,
                as: 'member'
            }]
        }]
    });
    if (request.method === 'POST') {
        let newStatus = 'proses';
        if (data.status === 'menunggu') {
            newStatus = 'proses';
        } else if (data.status === 'proses') {
            newStatus = 'selesai'
        }
        await data.update({
            status: newStatus
        });
        request.flash('success', 'Success');
        response.redirect('/pesanan');
        return
    }
    response.render('pesanan/detail', {
        data: data
    });
}