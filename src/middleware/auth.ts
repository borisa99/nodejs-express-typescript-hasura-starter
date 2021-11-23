import { RoleValue } from '@/models/RoleValue'
import { ServiceResponse } from '@/models/ServiceResponse'
import { serviceResponseHandler } from '@/shared/serviceResponseHandler'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const auth = (allowedRoles: RoleValue[] = [], isPublic = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result: ServiceResponse<any> = new ServiceResponse<any>()
    if (isPublic) {
      return next()
    }

    try {
      let token: string | null =
        'authorization' in req.headers
          ? (req.headers.authorization as string)
          : null

      let jwtPayload
      const secret: string = process.env.JWT_SECRET || ''
      if (token) {
        token = token.replace('Bearer', '').trim()

        // Check if token is valid
        jwtPayload = <any>jwt.verify(token, secret)

        // Check if user has the right role
        if (
          allowedRoles.length > 0 &&
          !jwtPayload.roles.some((role: RoleValue) =>
            allowedRoles.includes(role)
          )
        ) {
          result.error = 'You are not authorized to access this resource'
          result.status = 401
        }
        // // TODO Check if token is expired

        res.locals.user = jwtPayload
      } else {
        result.error = 'No token, authorization denied'
        result.status = 401
      }
    } catch (error: any) {
      result.error = error.message
      result.status = 401
    } finally {
      result.status === 200 ? next() : serviceResponseHandler(res, result)
    }
  }
}

export default auth
