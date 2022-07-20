const Model = require('../models');
const {
    NLPQuestion,
    NLPAnswer
} = Model;

import {
    SuccessResponse,
    ErrorResponse
} from '../lib/helper';

export const index = async (request, response) => {

    const data = await NLPQuestion.findAll({
        include: [{
            model: NLPAnswer,
            as: "answer",
        }]
    });
    response.render('nlp-question/index', {
        data: data
    });
}

export const create = async (request, response) => {
    if (request.method === 'POST') {
        try {
            const {
                answer,
                question
            } = request.body;
            await NLPQuestion.create({
                nlp_answers_id: answer,
                question: question,
            });
            request.flash('success', 'Success');
            response.redirect('/nlp-question/create');
            return
        } catch (error) {
            request.flash('error', 'Terjadi Kesalahan');
            response.redirect('/nlp-question/create');
            return
        }
    }
    const answer = await NLPAnswer.findAll();
    response.render('nlp-question/add', {
        answer: answer
    });
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
        response.redirect('/nlp-question');
        return
    }
    response.render('nlp-question/edit', {
        data: data
    });
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

export const findAll = async (request, response) => {
    try {
        const data = await NLPQuestion.findAll({
            include: [{
                model: NLPAnswer,
                as: "answer",
            }]
        });
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