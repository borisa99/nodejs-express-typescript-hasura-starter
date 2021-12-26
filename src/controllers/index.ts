import Container from 'typedi'
import { WeatherController } from './weather/WeatherController'
import { AuthController } from './auth/AuthController'
import { UserController } from './user/UserController'
import { FileController } from './file/FileController'

const weatherController = Container.get(WeatherController)
const authController = Container.get(AuthController)
const userController = Container.get(UserController)
const fileController = Container.get(FileController)

export { weatherController, authController, userController, fileController }
