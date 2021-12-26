import { FileService } from '@/services/file/FileService'
import { serviceResponseHandler } from '@/shared/serviceResponseHandler'
import { Service } from 'typedi'
import { Response, Request } from 'express'

@Service()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  upload = async (req: Request, res: Response): Promise<void> => {
    try {
      const { base64String } = req.body
      serviceResponseHandler(res, await this.fileService.upload(base64String))
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }
}
