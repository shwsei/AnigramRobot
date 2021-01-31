exports.up = knex => {
  return knex.schema.createTable('animes',table =>{
    table.increments('id');
    table.text('name').notNullable();
    table.text('description').notNullable();
    table.text('genre');
    table.integer('idMal');
    table.integer('year');
    table.text('type');
    table.text('imageUrl').notNullable();
    table.text('malUrl').notNullable();
    table.text('createdAt').defaultTo(knex.fn.now());
    table.text('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = knex => knex.schema.dropTable('animes')