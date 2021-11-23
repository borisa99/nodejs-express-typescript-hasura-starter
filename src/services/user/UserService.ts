import { IUserService } from './IUserService'
import { Service } from 'typedi'
import { GetUserPayload } from '@/shared/types/auth/GetUserPayload'
import { ServiceResponse } from '@/models/ServiceResponse'
import { generateTokenPayload } from '@/shared/jwt'
@Service()
export class UserService implements IUserService {
  async me(account_id: string): Promise<ServiceResponse<GetUserPayload>> {
    const response: ServiceResponse<GetUserPayload> =
      new ServiceResponse<GetUserPayload>()
    try {
      response.payload = await generateTokenPayload(account_id)
    } catch (error: any) {
      response.error = error.message
      response.status = 500
    }
    return response
  }
}
