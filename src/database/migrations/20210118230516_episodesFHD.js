exports.up = knex => {
  return knex.schema.createTable('episodesFHD',table =>{
    table.increments('id');
    table.text('file_id').notNullable();
    table.integer('animeId').unsigned();
    table.foreign('animeId').references('id').inTable('animes').onUpdate().onDelete();
    table.text('createdAt').defaultTo(knex.fn.now());
    table.text('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = knex => knex.schema.dropTable('episodesFHD')