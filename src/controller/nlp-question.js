const Model = require('../models');
const {
    NLPQuestion,
    NLPAnswer
} = Model;

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