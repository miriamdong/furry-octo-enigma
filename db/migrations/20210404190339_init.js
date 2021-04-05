exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table.increment('id').primary();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    })

    .createTable('artists', function(table) {
      table.increment('id').primary();
      table.string('name').notNullable();
      table.string('genre', 100).notNullable();
      table.string('publisher').notNullable();
    });

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('users')
    .dropTable('artists');
};

exports.config = {
  transaction: false
};
