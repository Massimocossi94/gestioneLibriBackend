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
    'Libreria',
    'root',
    'root',
    {
        dialect : 'mysql',
        host : 'localhost'
    }
);

module.exports = sequelize;