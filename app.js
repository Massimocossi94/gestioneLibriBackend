const express = require ('express');
const bodyParser = require('body-parser');
const bookRoutes = require ('./routes/books');

const sequelize = require('./utils/database');

const app = express();
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});
app.use('/', bookRoutes);

sequelize.authenticate().then( rec => {
    console.log('Connessione stabilita con successo al DB');
    sequelize.sync().then((result) =>{
        app.listen(8080);
    }).catch( err => {
        console.log('Sync al DB error:',err);
        }
    );
}).catch( err => {
    console.log('Connessione al DB error:',err);
    }
);

