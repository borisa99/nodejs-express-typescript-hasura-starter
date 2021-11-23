import { Response } from 'express'
import { ServiceResponse } from '@models/ServiceResponse'

export const serviceResponseHandler = (
  res: Response,
  data: ServiceResponse<any>
) => {
  if (data.status.toFixed().startsWith('4')) {
    return res.status(data.status).send({
      message: data.error,
    })
  }
  if (data.status.toFixed().startsWith('3')) {
    res.writeHead(data.status, {
      location: data.payload,
    })
    return res.end()
  }
  return res.send(data.payload)
}
