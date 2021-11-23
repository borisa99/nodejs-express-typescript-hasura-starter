import { userController } from '@/controllers'
import { router } from '@/router_wrapper'

router.post({
  routeName: '/me',
  handler: userController.me,
})

export default router.getInstance()
