"use strict"

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        static associate(models) {
            this.belongsTo(models.Category, {
                foreignKey: "category_id",
                as: "category",
            })
        }
    }

    Item.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nama: {
            type: DataTypes.STRING,
        },
        harga: {
            type: DataTypes.INTEGER,
        },
        deskripsi: {
            type: DataTypes.TEXT,
        },
        gambar: {
            type: DataTypes.TEXT,
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
        modelName: "Item",
        tableName: "items",
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    });

    return Item;
}