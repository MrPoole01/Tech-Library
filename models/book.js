
var bookshelf = require('../db/bookshelf');
require('./author');

var Book = bookshelf.Model.extend({
  tableName: 'book',
  authors: function () {
    return this.belongsToMany('Author').through('Author_Book');
  }
});

module.exports = bookshelf.model('Book', Book);
