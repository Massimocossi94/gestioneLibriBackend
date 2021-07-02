const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();

const feedController = require('../controllers/books');

//NO AUTH | AUTH
//GET ALL /feed/book
router.get('/book', feedController.getBooks);
//GET /feed/book/:id
router.get('/book/:id', feedController.getBook);
router.post('/book/:id', feedController.updateBook);
//POST /feed/book
router.post('/book', feedController.createBook);

//DELETE /feed/post
router.delete('/book/:id', feedController.deleteBook);

module.exports = router;