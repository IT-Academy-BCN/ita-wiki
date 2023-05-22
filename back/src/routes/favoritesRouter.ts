import Router from '@koa/router'
import { getUserFavoriteResources } from '../controllers'
import { pathRoot } from './routes'

const favoritesRouter = new Router()

favoritesRouter.prefix(pathRoot.v1.favorites)

favoritesRouter.get('/by-user/:userId?/:categorySlug?', getUserFavoriteResources)

export { favoritesRouter }
