import Router from '@koa/router'
import { pathRoot } from './routes'
import { authenticate, uploadImage } from '../middleware'
import { postMedia } from '../controllers'

const mediaRouter = new Router()
mediaRouter.prefix(pathRoot.v1.media)

mediaRouter.post('/', authenticate, uploadImage.single('media'), postMedia)

export { mediaRouter }
