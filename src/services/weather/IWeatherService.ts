import { Weather } from '@models/Weather'
import { ServiceResponse } from '@models/ServiceResponse'

export interface IWeatherService {
  get(city: string): ServiceResponse<Weather>
}
