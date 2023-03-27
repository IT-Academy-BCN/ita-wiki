import Router from '@koa/router'
import { loginController } from '../controllers'
import { validateUserLogin } from '../middleware/loginMiddleware'

const authRouter = new Router()

authRouter.prefix('/api/v1/auth')

authRouter.post('/login', validateUserLogin, loginController)

export { authRouter }
