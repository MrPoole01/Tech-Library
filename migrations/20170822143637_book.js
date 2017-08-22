
exports.up = function(knex, Promise) {
  return knex.schema.createTable('book', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.string('genre').notNullable();
    table.text('description').notNullable();
    table.string('cover_url').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('book');
};
