"use strict"

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            this.belongsTo(models.Item, {
                foreignKey: "item_id",
                as: "item",
            })
            this.belongsTo(models.User, {
                foreignKey: "user_id",
                as: "user",
            })
            this.belongsTo(models.Transaction, {
                foreignKey: "transaction_id",
                as: "transaction",
            })
        }
    }

    Cart.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        qty: {
            type: DataTypes.INTEGER,
        },
        harga: {
            type: DataTypes.INTEGER,
        },
        total: {
            type: DataTypes.INTEGER,
        },
        deskripsi: {
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
        modelName: "Cart",
        tableName: "carts",
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    });

    return Cart;
}