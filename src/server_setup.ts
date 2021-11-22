import express, { Request, Response } from 'express'
import cors, { CorsOptions } from 'cors'

// Create the express app
const app = express()

// Middleware
const corsOptions: CorsOptions = {
  origin: process.env.CORS_WHITELIST && process.env.CORS_WHITELIST.split(','),
  methods: ['GET', 'POST'],
}
// Configure for development
if (process.env.NODE_ENV === 'development') {
  corsOptions.origin = '*'
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.get('/health', (req: Request, res: Response) => {
  res.send('OK')
})

export { app }
