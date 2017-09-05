var bookshelf = require('../db/bookshelf');
require('./book');

var Author = bookshelf.Model.extend({
  tableName: 'author',
  books: function () {
    return this.belongsToMany('Book').through('Author_Book');
  }
});

module.exports = bookshelf.model('Author', Author);
