import { userController } from '@/controllers'
import { router } from '@/router_wrapper'

router.get({
  routeName: '/me',
  handler: userController.me,
})

export default router.getInstance()
