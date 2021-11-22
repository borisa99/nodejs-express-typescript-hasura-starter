import { router } from '@/router_wrapper'
import { authController } from '@/controllers'

router.post({
  routeName: '/register',
  isPublic: true,
  handler: authController.register,
})
router.get({
  routeName: '/activate',
  isPublic: true,
  handler: authController.activate,
})
router.post({
  routeName: '/login',
  isPublic: true,
  handler: authController.login,
})
router.post({
  routeName: '/refresh',
  isPublic: true,
  handler: authController.refresh,
})
router.post({
  routeName: '/request_reset_password',
  isPublic: true,
  handler: authController.requestResetPassword,
})
router.post({
  routeName: '/reset_password',
  isPublic: true,
  handler: authController.resetPassword,
})

export default router.getInstance()
