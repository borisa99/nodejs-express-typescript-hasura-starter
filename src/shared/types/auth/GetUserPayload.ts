import { AuthPayload } from './AuthPayload'

export interface GetUserPayload extends AuthPayload {
  first_name: string
  last_name: string
  avatar_url: string
}
