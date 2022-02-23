import 'reflect-metadata'

import dotenv from 'dotenv'
dotenv.config()

import { app, server, corsOptions } from './server_setup'
import { initRoutes } from './routes'
import { initSocketIO } from './plugins/socket.io'

const PORT = process.env.PORT || 8000

// Initialize routes
initRoutes(app)

// Initalize socket.io
initSocketIO(server, corsOptions)

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
