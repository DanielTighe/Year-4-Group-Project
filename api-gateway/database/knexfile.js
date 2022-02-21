// Update with your config settings.
const path = require('path');
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host : 'internal-database',
      user : 'root',
      password : 'example',
      database : 'humber_bridge'
    },
    migrations: {
      tableName: 'migrations'
    },
    pool: {
      min: 2,
      max: 6,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false // <- default is true, set to false
    },
  },

};
