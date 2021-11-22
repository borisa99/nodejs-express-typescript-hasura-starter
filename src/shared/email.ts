import nodemailer from 'nodemailer'
import Email from 'email-templates'
import { resolve } from 'path'

let transport = nodemailer.createTransport({
  port: Number(process.env.SMTP_PORT),
})
if (process.env.SMTP_HOST) {
  transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Boolean(process.env.SMTP_SECURE),
    auth: {
      pass: process.env.SMTP_PASS,
      user: process.env.SMTP_USER,
    },
    authMethod: process.env.SMTP_AUTH_METHOD,
  })
}
export const emailClient = new Email({
  transport,
  message: { from: process.env.SMTP_SENDER },
  send: true,
  views: {
    root: resolve(process.env.PWD || '.', 'custom/emails'),
    options: {
      extension: 'ejs',
    },
  },
})
