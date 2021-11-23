import { snakeCase } from 'lodash'
import knex_instance from './db'
import { Knex } from 'knex'
import pluralize from 'typescript-pluralize'

export default class Model {
  public db: Knex.QueryBuilder
  private readonly tableName: string

  constructor() {
    this.tableName = pluralize.plural(
      snakeCase(Object.getPrototypeOf(this).constructor.name)
    )
    this.db = knex_instance<this>(this.tableName)
  }
}
