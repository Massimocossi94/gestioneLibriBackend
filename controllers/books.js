const { validationResult } = require('express-validator');
const Sequelize = require('sequelize');
const Book = require('../models/book');

// GET ID BOOK
exports.getBook = (req, res, next) => {
  const bookId = req.params.id;
  Book.findByPk(bookId).then((book) => {
      res.json({ book :  book })
  }).catch(
      err  => console.log(err)
  );
};

//GET ALL LIBRi
exports.getBooks = (req, res, next) => {
  Book.findAll()
  .then((book) => { 
    res.json({ book :  book });
  }).catch(err  => console.log(err)
  );
};

//POST DEL LIBRO
exports.createBook = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({
        message : 'Errore input',
        error : errors.array()
      });
    }
    const titolo = req.body.titolo;
    const autori = req.body.autori;
    const trama = req.body.trama;
    const thumbnail = req.body.thumbnail;
    const dataPubblicazione = req.body.dataPubblicazione;
    const editore = req.body.editore;
    const isbn = req.body.isbn;
    const tipologia = req.body.tipologia;
    //INSERT NEL DATABASE
    Book.create(
    {
      titolo : titolo,
      autori : autori,
      trama : trama,
      thumbnail : thumbnail,
      dataPubblicazione : dataPubblicazione,
      editore : editore,
      isbn : isbn,
      tipologia : tipologia
    }
    ).then((book) => {
      res.status(201).json({
        messages: 'Success Operation',
        book : book
      });
    }).catch( err => {
      console.log('ERRORE CREAZIONE LIBRO',err);
    });
};

//UPDATE LIBRO
exports.updateBook = (req, res, next) => {
    const bookId = req.params.id;
    Book.findByPk(bookId).then(book => {
        return book.update({
            autori: req.body.autori,
            titolo: req.body.titolo,
            trama: req.body.trama,
            editore: req.body.editore,
            isbn: req.body.isbn
        });
    }).then(() => {
        res.status(201).json({
            messages : 'Success Operation',
        });
    }).catch(
        err => console.log(err)
    );
}

 //DELETE BOOK
 exports.deleteBook = (req,res,next) => {
    const bookId = req.params.id;
    Book.findByPk(bookId).then(book => {
        return book.destroy();
    }).then(() => {
        res.status(201).json({
          messages : 'Success Operation',
        });
    }).catch(
          err => console.log(err)
    );
 };


