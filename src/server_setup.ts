import http from 'http'
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

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors(corsOptions))
app.get('/health', (req: Request, res: Response) => {
  res.send('OK')
})

// Create server from http module so socket can also use it
const server = http.createServer(app)

export { app, server, corsOptions }
