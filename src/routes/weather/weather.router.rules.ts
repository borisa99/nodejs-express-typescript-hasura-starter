import { body } from 'express-validator'

export default {
  get: [body('city').not().isEmpty()],
}
