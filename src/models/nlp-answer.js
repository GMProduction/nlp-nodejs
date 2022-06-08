"use strict";

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class NLPAnswer extends Model {

    }

    NLPAnswer.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        type: DataTypes.STRING,
        answer: DataTypes.TEXT,
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
        modelName: "NLPAnswer",
        tableName: "nlp_answers",
        timestamps: true,
        underscored: true,
    });

    return NLPAnswer;
}