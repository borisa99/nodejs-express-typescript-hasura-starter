import { Knex } from 'knex'

import { Account } from '../../models/Account'
import { User } from '../../models/User'
import { AccountRole } from '../../models/AccountRole'
import { hashPassword } from '../../shared/bcrypt'
import { RoleValue } from '../../models/RoleValue'

export async function seed(knex: Knex): Promise<void> {
  const email = process.env.ADMIN_EMAIL
  const password = <string>process.env.ADMIN_PASSWORD

  // Deletes ALL existing entries
  const account = await knex<Account>('accounts').where({ email }).first()

  if (account) {
    await knex<User>('users').where({ id: account.user_id }).del()
  }

  //Create new user
  const [user_id]: string = await knex<User>('users').returning('id').insert({
    first_name: 'Admin',
    last_name: 'Admin',
    avatar_url:
      'https://w7.pngwing.com/pngs/617/679/png-transparent-computer-icons-others-monochrome-computer-wallpaper-sphere-thumbnail.png',
  })

  //Create new account
  const [account_id]: string = await knex<Account>('accounts')
    .returning('id')
    .insert({
      user_id,
      email,
      password_hash: await hashPassword(password),
      is_active: true,
    })

  // Insert account roles
  const roles = [RoleValue.SUPER_ADMIN, RoleValue.USER]
  const accountRoles = roles.map((role: RoleValue) => {
    return {
      account_id,
      role,
    }
  })
  await knex<AccountRole>('account_roles').insert(accountRoles)
}
