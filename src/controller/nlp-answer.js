const Model = require('../models');
import {
    SuccessResponse,
    ErrorResponse
} from '../lib/helper';
const {
    NLPAnswer
} = Model;

export const index = async (request, response) => {

    const data = await NLPAnswer.findAll();
    response.render('nlp-answer/index', {
        data: data
    });
}

export const create = async (request, response) => {
    if (request.method === 'POST') {
        try {
            const {
                tipe,
                answer
            } = request.body;
            await NLPAnswer.create({
                type: tipe,
                answer: answer,
            });
            request.flash('success', 'Success');
            response.redirect('/nlp-answer/create');
            return
        } catch (error) {
            request.flash('error', 'Terjadi Kesalahan');
            response.redirect('/nlp-answer/create');
            return
        }
    }
    response.render('nlp-answer/add');
}

export const detail = async (request, response) => {
    let id = request.params.id;
    const data = await NLPAnswer.findOne({
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
            tipe,
            answer
        } = request.body;
        await data.update({
            type: tipe,
            answer: answer,
        });
        request.flash('success', 'Success');
        response.redirect('/nlp-answer');
        return
    }
    response.render('nlp-answer/edit', {
        data: data
    });
}

export const findAll = async (request, response) => {
    try {
        const data = await NLPAnswer.findAll();
        return response.status(200).json({
            code: 200,
            data: data
        })
    } catch (error) {
        return response.status(500).json({
            code: 500,
            data: error
        })
    }
}

export const destroy = async (request, response) => {
    try {
        let id = request.params.id;
        await NLPAnswer.destroy({
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