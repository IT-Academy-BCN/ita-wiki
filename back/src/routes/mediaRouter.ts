import Router from '@koa/router'
import { pathRoot } from './routes'
import { authMiddleware, uploadImage } from '../middleware'
import { postMedia } from '../controllers'

const mediaRouter = new Router()
mediaRouter.prefix(pathRoot.v1.media)

mediaRouter.post('/', authMiddleware(), uploadImage.single('media'), postMedia)

export { mediaRouter }
