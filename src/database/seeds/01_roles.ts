import { Knex } from 'knex'
import { RoleValue } from '../../models/RoleValue'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('roles').del()

  // Inserts seed entries
  await knex('roles').insert([
    { value: RoleValue['ADMIN'] },
    { value: RoleValue['USER'] },
  ])
}
