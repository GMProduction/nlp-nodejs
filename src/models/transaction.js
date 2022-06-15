"use strict"

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: "user_id",
                as: "user",
            })
            this.hasMany(models.Cart, {
                foreignKey: "transaction_id",
                as: "cart",
            })
        }
    }

    Transaction.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        no_transaksi: {
            type: DataTypes.STRING,
            field: 'no_transaksi'
        },
        sub_total: {
            type: DataTypes.INTEGER,
            field: 'sub_total'
        },
        discount: {
            type: DataTypes.INTEGER,
        },
        total: {
            type: DataTypes.INTEGER,
        },
        status: {
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
        modelName: "Transaction",
        tableName: "transactions",
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    });

    return Transaction;
}