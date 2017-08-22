
exports.seed = function(knex, Promise) {
        return knex.raw('TRUNCATE author_book, book, author RESTART IDENTITY CASCADE')
      .then(function() {
        return knex('author_book').del()
      .then(function() {
        return knex('book').del()
      .then(function() {
        return knex('author').del();
      });
    });
  });
};
