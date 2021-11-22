import { Account } from '@models/Account'
import db from './db'
import { AccountValidation } from './types/auth/AccountValiation'
import dayjs from 'dayjs'

export const validateAccount = (
  should_be_active: boolean,
  account?: Account
): AccountValidation => {
  const response: AccountValidation = {
    is_valid: true,
    message: '',
  }
  if (!account) {
    response.message = 'Account not found'
    response.is_valid = false
  }
  if (should_be_active && account && !account.is_active) {
    response.message = 'Account is not active'
    response.is_valid = false
  }
  if (!should_be_active && account && account.is_active) {
    response.message = 'Account is active'
    response.is_valid = false
  }

  return response
}

export const updateTicket = async (
  id?: string,
  ticket?: string
): Promise<void> => {
  await db<Account>('accounts')
    .where({ id })
    .update({
      ticket: ticket || null,
      ticket_expires_at: ticket ? dayjs().add(1, 'day').toDate() : null,
    })
}

export const isTicketValid = (expires_at?: Date | null) => {
  if (!expires_at) {
    return false
  }
  return expires_at < dayjs().toDate()
}
