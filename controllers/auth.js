const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const User = require('../models/user');

//POST/ REGISTRAZIONE UTENTE
exports.registerUser = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({
        message : 'Errore input',
        error : errors.array()
      });
    }

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    bcrypt.hash(password, 12)
    .then(hashPassword => {
      User.create({username : username, email : email, password : hashPassword})
      .then(user => {
        res.status(201).json({
          messages: 'Success Operation',
          user : user
        });
      })
      .catch(err => {
        return res.status(422).json({
          message : err
        });
      });
    })
    .catch(err => {
      return res.status(422).json({
        message : err
      });
    });
};

//POST/LOGIN UTENTE
exports.loginUser = (req, res, next) => {
  const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({
        message : 'Errore input',
        error : errors.array()
      });
    }

    const email = req.body.email;
    const password = req.body.password;

    let loginUser;

    User.findOne({ where : {email : email}}).then(user =>{
      if(!user){
        return res.status(401).json({
          message : 'Email errata!!!',
        });
      }
      loginUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual){
        return res.status(401).json({
          message : 'Password errata'
        });
      }

    const token = jwt.sign(
      {
        id : loginUser.id, 
        email : loginUser.email,
        username : loginUser.username
      },'MFFB8DuC7uZ6upKCGNtD', {expiresIn : '2h'});

      res.status(201).json({
        messages: 'Sei Loggato',
        id : loginUser.id,
        token: token
      });
    })
    .catch(err => {
      return
      message : err

    });
};

//GET/ME
exports.loginMe = (req,res,next) => {
  res.status(200).json({
    user: req.user.username,
  });
}