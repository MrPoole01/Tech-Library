

exports.up = function(knex, Promise) {
  return knex.schema.createTable('author_book', (table) => {
    table.increments();
    table.integer('author_id').references('author.id');
    table.integer('book_id').references('book.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('author_book');
};
