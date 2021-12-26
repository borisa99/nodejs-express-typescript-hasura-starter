import { body } from 'express-validator'

export default {
  upload: [
    body('base64String')
      .isString()
      .notEmpty()
      .withMessage('base64String is required'),
  ],
}
