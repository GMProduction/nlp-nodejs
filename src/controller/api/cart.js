import {
    SuccessResponse,
    ErrorResponse,
    ItemNotFoundResponse
} from '../../lib/helper';

const Model = require('../../models');
const {
    Cart,
    Item,
    User,
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
        const data = await Cart.findAll({
            where: {
                user_id: id,
                transaction_id: {
                    [Op.eq]: null
                }
            },
            include: [{
                model: Item,
                as: 'item',
                include: [{
                    model: Category,
                    as: 'category'
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

export const create = async (request, response) => {
    try {
        const {
            id
        } = request.user;
        const {
            item_id,
            qty,
            deskripsi
        } = request.body;
        const _item = await Item.findOne({
            where: {
                id: item_id
            }
        })

        if (!_item) {
            return ItemNotFoundResponse(response, {
                message: 'Item Not Found!'
            })
        }

        const {
            harga
        } = _item;
        let total = parseInt(qty) * harga;
        let data = {
            item_id: item_id,
            user_id: id,
            transaction_id: null,
            qty: parseInt(qty),
            harga: harga,
            total: total,
            deskripsi: deskripsi
        }
        const result = await Cart.create(data);
        return SuccessResponse(response, {
            payload: result
        })
    } catch (error) {
        return ErrorResponse(response, {
            message: `failed ${error}`
        })
    }
}

export const checkout = async (request, response) => {
    const t = await sequelize.transaction();
    try {
        const {
            id
        } = request.user;
        const _carts = await Cart.findAll({
            where: {
                user_id: id,
                transaction_id: {
                    [Op.eq]: null
                }
            },
        })

        if (_carts.length <= 0) {
            return ItemNotFoundResponse(response, {
                message: 'No Items on cart'
            })
        }
        let total = _carts.map(item => item.total).reduce((prev, next) => prev + next);
        let now = new Date().getTime();
        const _transaction = await Transaction.create({
            user_id: id,
            no_transaksi: `TR-${now}`,
            sub_total: total,
            discount: 0,
            total: total,
            status: 'menunggu'
        })

        await Cart.update({
            transaction_id: _transaction.id
        }, {
            where: {
                user_id: id,
                transaction_id: {
                    [Op.eq]: null
                }
            },
        })
        await t.commit();
        return SuccessResponse(response, {
            payload: _transaction,
        })
    } catch (error) {
        await t.rollback();
        return ErrorResponse(response, {
            message: `failed ${error}`
        })
    }
}