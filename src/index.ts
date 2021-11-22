import 'reflect-metadata'

import dotenv from 'dotenv'
import { app } from './server_setup'
import { initRoutes } from './routes'

dotenv.config()
const PORT = process.env.PORT || 8000

// Initialize routes
initRoutes(app)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
