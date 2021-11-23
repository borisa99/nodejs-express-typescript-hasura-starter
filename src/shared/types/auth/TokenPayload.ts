import { AuthPayload } from './AuthPayload'
import { HasuraClaims } from './HasuraClaims'

export interface TokenPayload extends AuthPayload {
  'https://hasura.io/jwt/claims': HasuraClaims
}
