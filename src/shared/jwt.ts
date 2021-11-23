import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

import { GetUserPayload } from './types/auth/GetUserPayload'
import db from './db'

import { RefreshToken } from '@/models/RefreshToken'
import { RoleValue } from '@/models/RoleValue'
import { TokenPayload } from './types/auth/TokenPayload'

export const getAccountRoles = async (
  account_id: string
): Promise<RoleValue[]> => {
  return await db<RoleValue>('account_roles')
    .select('role')
    .where('account_id', account_id)
    .pluck('role')
}
export const generateUserPayload = async (
  account_id: string
): Promise<GetUserPayload> => {
  const userPayload: GetUserPayload = await db<GetUserPayload>('accounts')
    .select(
      'users.id',
      'accounts.id as account_id',
      'accounts.email',
      'users.first_name',
      'users.last_name',
      'users.avatar_url'
    )
    .leftJoin('users', 'accounts.user_id', 'users.id')
    .where('accounts.id', account_id)
    .first()
  userPayload.roles = await getAccountRoles(account_id)

  return userPayload
}

export const generateTokenPayload = async (
  account_id: string
): Promise<TokenPayload> => {
  const tokenPayload: TokenPayload = await db<TokenPayload>('accounts')
    .select('users.id', 'accounts.id as account_id', 'accounts.email')
    .leftJoin('users', 'accounts.user_id', 'users.id')
    .where('accounts.id', account_id)
    .first()
  tokenPayload.roles = await getAccountRoles(account_id)

  tokenPayload['https://hasura.io/jwt/claims'] = {
    'x-hasura-allowed-roles': tokenPayload.roles,
    'x-hasura-default-role': tokenPayload.roles[0],
    'x-hasura-user-id': tokenPayload.id,
    'x-hasura-account-id': tokenPayload.account_id,
  }
  return tokenPayload
}

export const generateToken = async (account_id: string): Promise<string> => {
  return await jwt.sign(
    await generateTokenPayload(account_id),
    <string>process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  )
}

export const generateRefreshToken = async (
  account_id: string
): Promise<string> => {
  // Delete old refresh tokens
  await db<RefreshToken>('refresh_tokens').where({ account_id }).del()

  // Generate new refresh token
  const [refreshToken]: string = await db<RefreshToken>('refresh_tokens')
    .returning('refresh_token')
    .insert({
      refresh_token: uuidv4(),
      expires_at: dayjs().add(1, 'day').toDate(),
      account_id,
    })
  return refreshToken
}
