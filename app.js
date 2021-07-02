const express = require ('express');

const bodyParser = require('body-parser');
const bookRoutes = require ('./routes/books');
app.use('/', bookRoutes);
var helmet = require('helmet');
const sequelize = require('./utils/database');
const app = express();
app.use(bodyParser.json());
console.log(process.env.NODE_ENV || 'develop');

app.use(helmet());
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});


sequelize.authenticate().then( rec => {
    console.log('Connessione stabilita con successo al DB');
    sequelize.sync().then((result) =>{
        app.listen(process.env.PORT || 8080);
    }).catch( err => {
        console.log('Sync al DB error:',err);
        }
    );
}).catch( err => {
    console.log('Connessione al DB error:',err);
    }
);




