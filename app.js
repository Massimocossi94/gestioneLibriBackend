const express = require ('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bookRoutes = require ('./routes/books');
const helmet = require('helmet');
const cors = require('cors')
const sequelize = require('./utils/database');
const app = express();


app.use(bodyParser.json());
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

app.use(helmet());
app.use(cors());
app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  });





app.use('/', bookRoutes);
console.log(process.env.NODE_ENV || 'develop');


require("./routes")(app);


const Book = require('./models/book');
const User = require('./models/user');
User.hasMany(Book);
Book.belongsTo(User, {constraints : true, onDelete : 'CASCADE'});

/*sequelize.authenticate().then( rec => {
    console.log('Connessione stabilita con successo al DB');
    //sequelize.sync({force:true})
    sequelize.sync()
    .then((result) => {return User.findByPk(1);})
    .then (user => {
        if(!user){
            return User.create({ username: 'Massimo', email : 'massimo@email.com', password : 'ciao1234'})
        }
        return user;
    })
    .then((user) =>{
        console.log(user);
        app.listen((process.env.PORT || 8080),function () {
            console.log('CORS-enabled web server listening on port '+ process.env.PORT);
        });
    }).catch( err => {
        console.log('Sync al DB error:',err);
        }
    );
}).catch( err => {
    console.log('Connessione al DB error:',err);
});*/

sequelize.authenticate().then( rec => {
    console.log('Connessione Stabilita con Successo');
    //sequelize.sync({force:true})
    sequelize.sync()
    .then(user => {
        console.log('Sync al DB con Successo');
    }).catch( err => {
        console.log('Sync al DB Error:',err);
    });
}).catch( err => {
     console.log('Connession al DB Error:',err);
});

app.listen((process.env.PORT || 8080),function () {
    console.log('CORS-enabled web server listening on port '+ process.env.PORT);
});

