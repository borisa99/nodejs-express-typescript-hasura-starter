import { Service } from 'typedi'
import { Weather } from '@models/Weather'
import { ServiceResponse } from '@models/ServiceResponse'
import { IWeatherService } from './IWeatherService'

@Service()
export class WeatherService implements IWeatherService {
  get(city: string): ServiceResponse<Weather> {
    const response = new ServiceResponse<Weather>()
    response.payload = {
      city,
      degrees: 20,
    }
    return response
  }
}
