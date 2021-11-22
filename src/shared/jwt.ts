import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

import { GetUserPayload } from './types/auth/GetUserPayload'
import db from './db'

import { RefreshToken } from '@/models/RefreshToken'
import { RoleValue } from '@/models/RoleValue'

export const generateTokenPayload = async (
  account_id: string
): Promise<GetUserPayload> => {
  const tokenPayload: GetUserPayload = await db<GetUserPayload>('accounts')
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
  tokenPayload.roles  = await db<RoleValue>('account_roles')
    .select('role')
    .where('account_id', account_id)
    .pluck('role')

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
