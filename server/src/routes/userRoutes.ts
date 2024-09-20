import { Router } from 'express'
import { fetchUser, loginController, loginWithGoogleController, logoutController, signupController } from '../controller/userController'
import { authMiddleware } from '../middleware/userMiddleware'

const router = Router()

router.route('/signup').post(signupController)

router.route('/login').post(loginController)

router.route('/login-with-google').post(loginWithGoogleController)

router.route('/logout').get(logoutController)

router.use(authMiddleware)

router.route('/fetch-user').get(fetchUser)

router.route('/delete-task').delete()


export default router