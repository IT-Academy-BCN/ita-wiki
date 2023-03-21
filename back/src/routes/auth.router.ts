import Router from '@koa/router'
import { login } from '../controllers/auth.controller'

const router = new Router({
  prefix: '/auth',
})

router.post('/v1/login', login)

export const authRouter = router.routes()
