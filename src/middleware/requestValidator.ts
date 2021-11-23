import { HasuraErrorResponse } from '@/shared/types/HasuraErrorResponse'
import express from 'express'
import { validationResult, ValidationChain } from 'express-validator'

// parallel processing
export const validate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const keys = Object.keys(req.params)
  let originalUrl = req.originalUrl

  // replace all values from url with keys
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    originalUrl = originalUrl.replace(`/${req.params[key]}`, `/${key}`)
  }

  const baseUrlArray = originalUrl.split('/').splice(1)

  const keyExtension = baseUrlArray.splice(2).join('_')
  const key =
    req.method.toLocaleLowerCase() + (keyExtension ? '_' + keyExtension : '')

  const name = baseUrlArray[1]
  const path = `../routes/${name}/${name}.router.rules`
  const validations = await require(path)
  const validationRules = validations.default[key] ?? []
  await Promise.all(
    validationRules.map((validation: ValidationChain) => validation.run(req))
  )

  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const firstError = errors.array()[0]
  const error: HasuraErrorResponse = {
    message: firstError.msg + '.' + ' Location ' + firstError.param,
    code: firstError.msg.trim().split(' ').join('_').toLowerCase(),
  }
  res.status(400).json(error)
}
