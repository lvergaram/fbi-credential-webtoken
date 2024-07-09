import { Router } from 'express'
import { userController } from './user.controller.js'

const router = Router()

router.post('/login', userController.login)
router.get('/restringido/:token', userController.restringido)

export default router
