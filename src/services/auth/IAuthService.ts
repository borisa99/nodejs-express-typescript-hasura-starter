import { JWT } from '@/shared/types/auth/JWT'
import { RegisterUser } from '@/shared/types/auth/RegisterUser'
import { ServiceResponse } from '@models/ServiceResponse'

export interface IAuthService {
  register(user: RegisterUser): Promise<ServiceResponse<string>>
  activate(ticket: string): Promise<ServiceResponse<string>>
  login(email: string, password: string): Promise<ServiceResponse<JWT>>
  refresh(refreshToken: string): Promise<ServiceResponse<JWT>>
  requestPasswordReset(email: string): Promise<ServiceResponse<string>>
  resetPassword(
    ticket: string,
    password: string
  ): Promise<ServiceResponse<string>>
}
