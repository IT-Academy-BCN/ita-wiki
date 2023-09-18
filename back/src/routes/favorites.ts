import Router from '@koa/router'
import { z } from 'zod'
import { authenticate, errorMiddleware, validate } from '../middleware'
import { pathRoot } from './routes'
import { putFavoriteByUserId } from '../controllers/favorites/putFavoriteByUserId'
import { favoritePutSchema } from '../schemas/favorites/favoritePutSchema'

const favorites = new Router()

favorites.prefix(pathRoot.v1.favorites)

favorites.put(
  '/',
  authenticate,
  validate(z.object({ body: favoritePutSchema })),
  putFavoriteByUserId
)

export { favorites }
