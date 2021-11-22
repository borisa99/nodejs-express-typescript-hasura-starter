import { RoleValue } from '@/models/RoleValue'
import { Request, Response } from 'express'

export interface RouterWrapperParams {
  routeName: string
  allowedRoles?: RoleValue[]
  isPublic?: boolean
  handler: (req: Request, res: Response) => void
}
