const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();
const bookController = require('../controllers/books');

const isAuth = require ('../middleware/is-auth');


//POST /book/creazione libro
router.post('/book',isAuth,
    [
        body('titolo').trim()
        .isLength({ min : 3}).withMessage('Titolo Maggiore di 3 caratteri')
        .exists().withMessage('Il Titolo è richiesto'),
        body('tipologia').trim().not().isEmpty().withMessage('tipologia non vuota')
    ]
,bookController.createBook);


//GET ALL/book
router.get('/book', bookController.getBooks);


//GET ALL/book/forME
router.get('/book/user/me',isAuth, bookController.getBooksByMe);


//GET /book/:id
router.get('/book/:id', bookController.getBook);


//MODIFICA/book
router.post('/book/:id',isAuth, bookController.updateBook);


//DELETE/book
router.delete('/book/:id',isAuth, bookController.deleteBook);


module.exports = router;