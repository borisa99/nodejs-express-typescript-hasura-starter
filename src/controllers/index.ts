import Container from 'typedi'
import { WeatherController } from './weather/WeatherController'
import { AuthController } from './auth/AuthController'
import { UserController } from './user/UserController'

const weatherController = Container.get(WeatherController)
const authController = Container.get(AuthController)
const userController = Container.get(UserController)

export { weatherController, authController, userController }
