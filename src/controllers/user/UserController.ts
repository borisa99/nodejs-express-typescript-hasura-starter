import { UserService } from '@/services/user/UserService'
import { serviceResponseHandler } from '@/shared/serviceResponseHandler'
import { Service } from 'typedi'
import { Response } from 'express'
import { Request } from 'express-serve-static-core'

@Service()
export class UserController {
  constructor(private readonly userService: UserService) {}

  me = async (req: Request, res: Response): Promise<void> => {
    try {
      const { account_id } = res.locals.user
      serviceResponseHandler(res, await this.userService.me(account_id))
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }
}
