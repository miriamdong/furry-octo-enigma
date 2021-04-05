exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table.increment('id');
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.timestamps('created').notNullable();
    })

    .createTable('artists', function(table) {
      table.increment('id');
      table.string('name').notNullable();
      table.string('genre', 100).notNullable();
      table.string('publisher').notNullable();
      table.timestamps(true, true);
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
