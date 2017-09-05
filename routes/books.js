var express = require('express')
var router = express.Router()
var db = require('../db/queries')
var Book = require('../models/book')
var Author = require('../models/author')
var Author_Book = require('../models/author_book')

/* GET: home page. */
router.get('/', (req, res, next) => {
  db.Book.get(null, req.query)
    .then(function (book) {
      Book.count()
        .then(function (count) {
      res.render('books/all_bk', { books: book, count: count, query: req.query })
    })
  })
})

/* Add: book */
router.get('/add', (req, res, next) => {
  res.render('books/add_bk')
})

/* Single: book -> updatred */
router.get('/:id', (req, res, next) => {
  db.Book.get(req.params.id)
    .then(function (book) {
    res.render('books/single_bk', { book: book })
  })
})

/* GET: edit book */
router.get('/edit/:id', (req, res, next) => {
  db.Book.get(req.params.id)
    .then(function (book) {
      db.Author.get()
        .then(function (author) {
        res.render('books/edit_bk', { book: book, author: author })
    })
  })
})

/* Delete: author -> book */
router.get('/delete-author/:bookId/:authorId', (req, res, next) => {
  db.Author_Book.destroy(req.params.bookId, req.params.authorId)
    .then(function () {
      res.redirect('/books/edit/' + req.params.bookId )
  })
})

/* POST: book */
router.post('/add', (req, res, next) => {
  db.Book.insert(req.body)
    .then(function () {
      res.redirect('/books?page=1')
  })
})

/* POST: update book info */
router.post('/edit/:id', (req, res, next) => {
  db.Book.update(req.params.id, req.body)
    .then(function () {
      res.redirect('/books/' + req.params.id)
  })
})

/* POST: book -> author */
router.post('/add-author-to-book', (req, res, next) => {
  db.Author_Book.insert(req.body)
    .then(function () {
     res.redirect('/books/edit/' + req.body.book_id)
  })
})

/* DELETE books */
router.post('/delete/:id', (req, res, next) => {
  db.Book.destroy(req.params.id)
    .then(function () {
      res.redirect('/books?page=1')
  })
})


module.exports = router;
