import {
    response
} from 'express';

const Model = require('../models');
const {
    NLPQuestion,
    NLPAnswer
} = Model;

const {
    NlpManager
} = require('node-nlp');

const manager = new NlpManager({
    languages: ['id', 'en'],
    forceNER: true
})
export const viewPage = async (request, response) => {
    response.render('index');
}

export const executeNLP = async (request, response) => {
    try {
        const {
            quest
        } = request.body
        console.log(quest);
        const question = await NLPQuestion.findAll({
            include: [{
                model: NLPAnswer,
                as: "answer",
            }]
        });
        const answer = await NLPAnswer.findAll();
        question.forEach(function (v, k) {
            manager.addDocument('id', v['question'], v['answer']['type']);
        });

        answer.forEach(function (v, k) {
            manager.addAnswer('id', v['type'], v['answer']);
        });

        await manager.train();
        manager.save();
        const result = await manager.process('id', quest);
        return response.status(200).json({
            code: 200,
            data: result
        })
    } catch (error) {
        return response.status(500).json({
            code: 500,
            data: error
        })
    }
}