
var express = require('express')
var router = express.Router()
var db = require('../db/queries')
var Book = require('../models/book')
var Author = require('../models/author')
var Author_Book = require('../models/author_book')

/* GET home page. */
router.get('/', function(req, res, next) {
  var search = req.query.search;
  if (search) {
    db.Search(search).then(function (data) {
      res.render('index', {
        search: search,
        book: data.book,
        author: data.author
      })
    })
  } else {
    res.render('index')
  }
})

module.exports = router;
