import { Request, Response } from 'express'
import { Service } from 'typedi'
import { WeatherService } from '@services/weather/WeatherService'
import { serviceResponseHandler } from '@shared/serviceResponseHandler'

@Service()
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  public get = async (req: Request, res: Response): Promise<void> => {
    try {
      const { city } = req.body
      serviceResponseHandler(res, await this.weatherService.get(city))
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
  }
}
