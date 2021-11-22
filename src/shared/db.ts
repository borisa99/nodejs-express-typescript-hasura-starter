import { knex } from 'knex'
import config from '../database/knexfile'

export default knex(config)
