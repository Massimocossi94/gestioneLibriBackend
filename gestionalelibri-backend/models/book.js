const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const book = sequelize.define(
    'product',
    {
        id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull : false,
            primaryKey: true
        },
        titolo: {
            type: Sequelize.STRING,
            allowNull : false,
        },
        autori: {
            type: Sequelize.STRING,
            allowNull : true,
        },
        trama: {
            type: Sequelize.TEXT,
            allowNull : true,
        },
        thumbnail: {
            type: Sequelize.STRING,
            allowNull : true,
        },
        dataPubblicazione: {
            type: Sequelize.STRING,
            allowNull : true,
        },
        editore: {
            type: Sequelize.STRING,
            allowNull : true,
        },
        isbn: {
            type: Sequelize.BIGINT,
            allowNull : true,

        },
        tipologia: {
            type: Sequelize.STRING,
            allowNull : true,
        }
    }
);

module.exports = book;