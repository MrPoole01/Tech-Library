
var bookshelf = require('../db/bookshelf');
require('./book');
require('./author');

var Author_Book = bookshelf.Model.extend({
  tableName: 'author_book',
  author:  function () {
    return this.hasMany('Book');
  },
  book:  function () {
    return this.hasMany('Author');
  }
});

module.exports = bookshelf.model('Author_Book', Author_Book);
