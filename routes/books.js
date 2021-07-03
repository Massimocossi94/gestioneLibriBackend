const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const feedController = require('../controllers/books');

//NO AUTH | AUTH
//GET ALL /feed/book
router.get('/book', feedController.getBooks);
//GET /feed/book/:id
router.get('/book/:id', feedController.getBook);
router.post('/book/:id', feedController.updateBook);
//POST /feed/book
router.post('/book',
    [
        body('titolo').trim()
        .isLength({ min : 3}).withMessage('Titolo Maggiore di 3 caratteri')
        .exists().withMessage('Il Titolo è richiesto'),
        body('autori').trim()
        .isLength({ min : 5}).withMessage('Autori Maggiore di 5 caratteri'),
    ]
,feedController.createBook);

//DELETE /feed/post
router.delete('/book/:id', feedController.deleteBook);

module.exports = router;