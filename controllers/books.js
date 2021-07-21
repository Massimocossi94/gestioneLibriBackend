const { validationResult } = require('express-validator/check');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Book = require('../models/book');


//GET ALL LIBRi
exports.getBooks = (req, res, next) => {

  Book.findAll()
  .then((book) => { 
    res.json({ book :  book });
  }).catch(err  => console.log(err)
  );
};

//GET ALL LIBRi/forMe
exports.getBooksByMe = (req, res, next) => {
  //Book.findAll()
  req.user.getBooks()
  .then((book) => { 
    res.json({ book :  book });
  }).catch(err  => console.log(err)
  );
};

// GET ID BOOK
exports.getBook = (req, res, next) => {
  const bookId = req.params.id;
  Book.findByPk(bookId).then((book) => {
      res.json({ book :  book })
  }).catch(
      err  => console.log(err)
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
    req.user.createBook({
      titolo : titolo,
      autori : autori,
      trama : trama,
      thumbnail : thumbnail,
      dataPubblicazione : dataPubblicazione,
      editore : editore,
      isbn : isbn,
      tipologia : tipologia,
    }).then((book) => {
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
    req.user.getBooks({where : {id : bookId}}).then(books => {
        const book = books[0];
        if(!book){
          res.status(404).json({
            messages : 'Libro Not Found',
          });
        }
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
};

//DELETE BOOK
exports.deleteBook = (req,res,next) => {
  const bookId = req.params.id;
  //req.user.getBooks({where : {id : bookId}}).then(books => {
    //const book = books[0];
    Book.findByPk(bookId).then(book => { 
    if(!book){
      res.status(404).json({
        messages : 'Libro Not Found',
      });
    }
    if (book.userId != req.user.id){
      res.status(401).json({
        messages : 'Operazione non permessa'
      })
    };
    return book.destroy();
  }).then(() => {
      res.status(201).json({
        messages : 'Success Operation',
      });
  }).catch(
        err => console.log(err)
  );
};


