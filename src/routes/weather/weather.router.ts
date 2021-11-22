import { router } from '@/router_wrapper'
import { weatherController } from '@/controllers'

router.get({ routeName: '/', handler: weatherController.get })

export default router.getInstance()
