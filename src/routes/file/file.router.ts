import { router } from '@/router_wrapper'
import { fileController } from '@/controllers'

router.post({
  routeName: '/upload',
  isPublic: true,
  handler: fileController.upload,
})

export default router.getInstance()
