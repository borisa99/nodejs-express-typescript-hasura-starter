import { RoleValue } from '@/models/RoleValue'

export interface HasuraClaims {
  'x-hasura-allowed-roles': RoleValue[]
  'x-hasura-default-role': string
  'x-hasura-user-id': string
  'x-hasura-account-id': string
}
