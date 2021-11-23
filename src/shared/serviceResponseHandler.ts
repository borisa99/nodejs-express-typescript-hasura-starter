import { Response } from 'express'
import { ServiceResponse } from '@models/ServiceResponse'
import { HasuraErrorResponse } from './types/HasuraErrorResponse'

export const serviceResponseHandler = (
  res: Response,
  data: ServiceResponse<any>
) => {
  if (
    data.payload &&
    (typeof data.payload === 'string' || data.payload instanceof String)
  ) {
    data.payload = {
      value: data.payload,
    }
  }
  if (
    data.status.toFixed().startsWith('4') ||
    data.status.toFixed().startsWith('5')
  ) {
    const error: HasuraErrorResponse = {
      message: data.error,
      code: data.error.trim().split(' ').join('_').toLowerCase(),
    }
    return res.status(data.status).send(error)
  }
  if (data.status.toFixed().startsWith('3')) {
    res.writeHead(data.status, {
      location: data.payload.value,
    })
    return res.end()
  }
  return res.send(data.payload)
}
