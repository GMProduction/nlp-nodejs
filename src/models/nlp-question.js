"use strict"

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class NLPQuestion extends Model {
        static associate(models) {
            this.belongsTo(models.NLPAnswer, {
                foreignKey: "nlp_answers_id",
                as: "answer",
            });
        }
    }

    NLPQuestion.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        question: DataTypes.TEXT,
        nlp_answers_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                key: 'id',
                model: 'nlp_answers'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "created_at",
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "updated_at",
        },
    }, {
        sequelize,
        modelName: "NLPQuestion",
        tableName: "nlp_questions",
        timestamps: true,
        underscored: true,
    });

    return NLPQuestion;
}