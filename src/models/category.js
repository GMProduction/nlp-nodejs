"use strict"

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            // this.hasOne(models.It, {
            //     foreignKey: "category_id",
            //     as: "member",
            // });
        }
    }

    Category.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nama: {
            type: DataTypes.STRING,
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
        modelName: "Category",
        tableName: "categories",
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    });

    return Category;
}