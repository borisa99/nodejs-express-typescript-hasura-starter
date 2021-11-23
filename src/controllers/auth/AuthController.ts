import { Request, Response } from 'express'
import { Service } from 'typedi'
import { AuthService } from '@services/auth/AuthService'
import { serviceResponseHandler } from '@shared/serviceResponseHandler'

@Service()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user } = req.body
      serviceResponseHandler(res, await this.authService.register(user))
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }
  public activate = async (req: Request, res: Response): Promise<void> => {
    try {
      const { ticket } = req.query
      serviceResponseHandler(
        res,
        await this.authService.activate(<string>ticket)
      )
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }
  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body.input
      serviceResponseHandler(res, await this.authService.login(email, password))
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }
  public refresh = async (req: Request, res: Response): Promise<void> => {
    try {
      const { refresh_token } = req.body.input
      serviceResponseHandler(res, await this.authService.refresh(refresh_token))
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }
  public requestResetPassword = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { email } = req.body.input
    try {
      serviceResponseHandler(
        res,
        await this.authService.requestPasswordReset(email)
      )
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }
  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { ticket, password } = req.body
    try {
      serviceResponseHandler(
        res,
        await this.authService.resetPassword(<string>ticket, password)
      )
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }
}
