import { ServiceResponse } from '@/models/ServiceResponse'

export interface IFileService {
  upload(base64String: string): Promise<ServiceResponse<string>>
}
