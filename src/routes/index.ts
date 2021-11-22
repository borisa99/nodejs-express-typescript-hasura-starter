import { Application } from 'express'
import WeatherRouter from './weather/weather.router'
import AuthRouter from './auth/auth.router'
import UserRouter from './user/user.router'

export const initRoutes = (app: Application) => {
  app.use('/api/weather', WeatherRouter)
  app.use('/api/auth', AuthRouter)
  app.use('/api/user', UserRouter)
}
