import { Knex } from 'knex'

import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../../.env') })

const config: Knex.Config = {
  client: process.env.DATABASE_CLIENT,
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    extension: 'ts',
    tableName: 'knex_migrations',
    directory: 'migrations',
  },
  seeds: {
    extension: 'ts',
    directory: 'seeds',
  },
}

export default config
