import { body, query } from 'express-validator'
export default {
  post_register: [
    body('user.ticket').notEmpty().withMessage('ticket is required'),
    body('user.first_name').isString().withMessage('First name must be valid'),
    body('user.last_name').isString().withMessage('Last name must be valid'),
    body('user.email').notEmpty().isEmail().withMessage('Email must be valid'),
    body('user.password')
      .isLength({ min: 8 })
      .withMessage('Password must be minimum 8 characters long'),
    body('user.roles')
      .isArray()
      .withMessage('Roles must be valid array of available roles'),
  ],
  get_activate: [
    query('ticket')
      .notEmpty()
      .withMessage('Ticket query parameter is required'),
  ],
  post_login: [
    body('input.email').notEmpty().isEmail().withMessage('Email must be valid'),
    body('input.password')
      .notEmpty()
      .isString()
      .withMessage('Password must be valid'),
  ],
  post_refresh: [
    body('input.refresh_token')
      .notEmpty()
      .isString()
      .withMessage('Refresh token must be valid'),
  ],
  post_request_reset_password: [
    body('input.email').notEmpty().isEmail().withMessage('Email must be valid'),
  ],
  post_reset_password: [
    body('input.ticket')
      .notEmpty()
      .isString()
      .withMessage('Ticket must be valid'),
    body('input.password')
      .notEmpty()
      .isString()
      .withMessage('Password must be valid'),
  ],
  post_invite: [
    body('input.email').notEmpty().isEmail().withMessage('Email must be valid'),
    body('input.role').notEmpty().isString().withMessage('Role must be valid'),
  ],
}
