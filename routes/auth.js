const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');
const User = require('../models/user');


//POST/REGISTRAZIONE UTENTE
router.post('/register',
    [
        body('email').isEmail().withMessage('Inserire email valida')
        .custom((value, {req}) => {
            return User.findOne({ where : {email : value}}).then(user =>{
                if(user){
                    return Promise.reject('Email già esistente!!!');
                }
            })
        }),
        body('password').trim().isLength({min : 8}).withMessage('Password almeno di 8 caratteri'),
        body('username').trim().not().isEmpty().withMessage('Inserisci Username')
        .custom((value, {req}) => {
            return User.findOne({ where : {username : value}}).then(user =>{
                if(user){
                    return Promise.reject('Username già esistente!!!');
                }
            })
        }),
    ]
,authController.registerUser);


//POST/ LOGIN UTENTE
router.post('/login',
    [
        body('email').isEmail().withMessage('Inserire email valida'),
        body('password').trim().isLength({min : 8}).withMessage('Password almeno di 8 caratteri')
    ],
authController.loginUser);


//GET/ ME
router.get('/me',isAuth,authController.loginMe);

module.exports = router;