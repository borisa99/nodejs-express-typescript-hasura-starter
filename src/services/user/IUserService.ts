import { ServiceResponse } from '@/models/ServiceResponse'
import { GetUserPayload } from '@/shared/types/auth/GetUserPayload'

export interface IUserService {
  me(account_id: string): Promise<ServiceResponse<GetUserPayload>>
}
