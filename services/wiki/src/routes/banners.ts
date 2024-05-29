import Router from '@koa/router'
import { listBanners } from '../controllers'
import { pathRoot } from './routes'

const bannersRouter = new Router()

bannersRouter.prefix(pathRoot.v1.banners)

bannersRouter.get('/', listBanners)

export { bannersRouter }
