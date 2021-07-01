/*
onst mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    database : 'Libreria',
    user : 'root',
    password : 'root'
});

module.exports = pool.promise();
*/

const Sequelize = require('sequelize');

const sequelize = new Sequelize (
    process.env.NODE_DATABASE,
    process.env.NODE_USER,
    process.env.NODE_PW,
    {
        dialect : 'mysql',
        host :  process.env.NODE_URL_DATABASE
    }
);

module.exports = sequelize;