import { Request } from 'express'
import { GetUserPayload } from './GetUserPayload'

export interface AuthRequest extends Request {
  user: GetUserPayload
}
