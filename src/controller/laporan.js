import {
    ErrorResponse,
    SuccessResponse
} from '../lib/helper';

const Model = require('../models');
const moment = require('moment');
const {
    Transaction,
    Cart,
    User,
    Member,
    Category,
    Item
} = Model;
const {
    Op, where
} = require("sequelize");
const pdfService = require('../controller/pdf-service');
export const penjualan = async (request, response) => {
    response.render('laporan/penjualan/index', { moment: moment });
}

export const barangTerjual = async (request, response) => {
    response.render('laporan/barang-terjual/index', { moment: moment });
}

export const penjualan_data = async (request, response) => {
    try {
        const {
            tgl1, tgl2
        } = request.query;
        const data = await Transaction.findAll({
            where: {
                created_at: {
                    [Op.between]: [tgl1, tgl2+' 23:59:59']
                },
                status: 'selesai'
            },
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
        return SuccessResponse(response, {
            data: data
        });
    } catch (error) {
        return ErrorResponse(response, {
            data: []
        });
    }
}

export const penjualan_cetak = async (request, response) => {
    const {
        tgl1, tgl2
    } = request.query;
    pdfService.buildReportPenjualan(
        tgl1, tgl2, response
    )
}

export const barangTerjualData = async (request, response) => {
    try {
        const {
            tgl1, tgl2
        } = request.query;
        const data = await Cart.findAll({
            where: {
                // created_at: {
                //     [Op.between]: [tgl1, tgl2+' 23:59:59']
                // },
                // status: 'selesai'
            },
            include: [{
                model: Transaction,
                as: 'transaction',
                where: {
                    created_at: {
                        [Op.between]: [tgl1, tgl2+' 23:59:59']
                    },
                    status: 'selesai'
                }
            }, {
                model: Item,
                as: 'item',
                include: [{
                    model: Category,
                    as: 'category'
                }]
            }]
        });
        return SuccessResponse(response, {
            data: data
        });
    } catch (error) {
        return ErrorResponse(response, {
            data: error.message
        });
    }
}

export const barangTerjualCetak = async(request, response) => {
    const {
        tgl1, tgl2
    } = request.query;
    pdfService.buildReportItem(
        tgl1, tgl2, response
    )
}