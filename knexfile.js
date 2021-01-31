// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      database: process.env.DB,
      user: process.env.USER,
      password: process.env.PASS
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds:{
      directory: `${__dirname}/src/database/migrations`
    }
  }

};
