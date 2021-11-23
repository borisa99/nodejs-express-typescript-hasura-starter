import { User } from '../models/User'
import knex from '../shared/db'

test('check if db is instance of kneks', () => {
  expect(new User().db).toStrictEqual(knex<User>('users'))
})
