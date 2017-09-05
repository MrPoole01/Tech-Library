var Book = require('../models/book')
var Author = require('../models/author')
var Author_Book = require('../models/author_book')
module.exports = {

  Book: {

    get: function(id, query) {
      if (id) {
        return Book.where({ id: id })
          .fetch({ withRelated: 'authors' })
          .then(function(collection) {
            return collection.toJSON()
          })
      } else if (query){
          return Book.forge()
            .orderBy('title', 'ASC')
            .fetchPage({
              pageSize: 6,
              page: query.page,
              withRelated: 'authors'
            }).then(function(collection) {
              return collection.toJSON()
            })
      } else {
        return Book.forge()
          .orderBy('title', 'ASC')
          .fetchAll({ withRelated: 'authors' })
          .then(function(collection) {
            return collection.toJSON()
          })
      }

    },

    update: function(id, body) {
      return Book.forge({ id: id })
        .fetch()
        .then(function(book) {
          return book.save(body)
        })
    },

    insert: function(data) {
      return Book.forge().save(data)
    },

    destroy: function(id) {
      return Author_Book.where({ book_id: id })
        .destroy()
        .then(function() {
          return Book.where({ id: id }).destroy()
        })
    }

  },

  Author: {

    get: function(id, query) {
      if (id) {
        return Author.where({ id: id })
          .fetch({ withRelated: 'books' })
          .then(function(collection) {
            return collection.toJSON()
          })
      } else if (query) {
        return Author.forge()
          .orderBy('first_name', 'ASC')
          .fetchPage({
            pageSize: 6,
            page: query.page,
            withRelated: 'books'
        }).then(function(collection) {
          return collection.toJSON()
        })
      } else {
        return Author.forge()
          .orderBy('first_name', 'ASC')
          .fetchAll({ withRelated: 'books' })
          .then(function(collection) {
          return collection.toJSON()
        })
      }

    },

    update: function(id, body) {
      return Author.forge({ id: id }).fetch()
      .then(function(author) {
        return author.save(body)
      })
    },

    insert: function(data) {
      return Author.forge().save(data);
    },

    destroy: function(id, book_id) {
      return Author_Book.where({ author_id: id })
      .destroy()
      .then(function() {
        return Author.where({ id: id }).destroy()
      })
    }

  },

  Author_Book: {

    insert: function (data) {
      return Author_Book.forge().save(data)
    },

    destroy: function(bookId, authorId) {
      return Author_Book.where({ book_id: bookId, author_id: authorId }).destroy()
    }

  },

  Search: function (search) {
      return Book.where('title', 'ilike', '%' + search + '%').fetchAll()
      .then(function (book) {
        var book = book ? book.toJSON() : null;
        return Author.where('first_name', 'ilike', '%' + search + '%').fetchAll()
          .then(function (author) {
            var author = author ? author.toJSON() : null;
            return { book: book, author: author };
          })
      })
  }

}
