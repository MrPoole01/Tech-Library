var express = require('express')
var router = express.Router()
var db = require('../db/queries')
var Book = require('../models/book')
var Author = require('../models/author')
var Author_Book = require('../models/author_book')

/* GET: home page. */
router.get('/', (req, res, next) => {
  db.Author.get(null, req.query)
    .then(function (author) {
      Author.count()
      .then(function(count) {
        res.render('authors/all_auth', { authors: author, count: count, query: req.query })
    })
  })
})

/* Add: author */
router.get('/add', (req, res, next) => {
  res.render('authors/add_auth');
})

/* Single: author -> updated-info */
router.get('/:id', (req, res, next) => {
  db.Author.get(req.params.id)
    .then(function(author) {
      res.render('authors/single_auth', { author: author })
  })
})

/* GET: edit author */
router.get('/edit/:id', (req, res, next) => {
  db.Author.get(req.params.id)
    .then(function(author) {
      db.Book.get()
      .then(function(book) {
        res.render('authors/edit_auth', { author: author, book: book })
    })
  })
})

/* Delete: author from book */
router.get('/delete-book/:authorId/:bookId', (req, res, next) => {
  db.Author_Book.destroy(req.params.bookId, req.params.authorId)
    .then(function() {
      res.redirect('/authors/edit/' + req.params.authorId )
  })
})

/* POST: author */
router.post('/add', (req, res, next) => {
  db.Author.insert(req.body)
    .then(function() {
      res.redirect('/authors?page=1')
  })
})

/* POST: update author info */
router.post('/edit/:id', (req, res, next) => {
  db.Author.update(req.params.id, req.body)
    .then(function() {
      res.redirect('/authors/' + req.params.id)
  })
})

/* POST: Auth -> book */
router.post('/add-book-to-author', (req, res, next) => {
  db.Author_Book.insert(req.body)
    .then(function() {
      res.redirect('/authors/edit/' + req.body.author_id)
  })
})

/* DELETE author */
router.post('/delete/:id', (req, res, next) => {
  db.Author.destroy(req.params.id)
    .then(function() {
      res.redirect('/authors?page=1')
  })
})


module.exports = router;
