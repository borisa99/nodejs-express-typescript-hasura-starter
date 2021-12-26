import { ServiceResponse } from '@/models/ServiceResponse'
import { s3 } from '@/shared/aws'
import { Service } from 'typedi'
import { IFileService } from './IFileService'
@Service()
export class FileService implements IFileService {
  async upload(base64String: string): Promise<ServiceResponse<string>> {
    const response: ServiceResponse<string> = new ServiceResponse<string>()
    try {
      const type = base64String.split(';')[0].split('/')[1]
      const buffer = Buffer.from(base64String.split(',')[1], 'base64')

      const params = {
        Bucket: <string>process.env.AWS_S3_BUCKET_NAME,
        Key: `${Date.now()}.${type}`,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: `image/${type}`,
        ACL: 'public-read',
      }

      const { Location } = await s3.upload(params).promise()

      response.payload = Location
      return response
    } catch (error: any) {
      response.status = 500
      response.error = error.message
    }
    return response
  }
}
