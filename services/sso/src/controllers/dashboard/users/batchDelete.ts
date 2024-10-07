import { Context, Middleware } from 'koa'
import { NotFoundError } from '../../../utils/errors'
import db from '../../../db/knexClient'

export const dashboardBatchDelete: Middleware = async (ctx: Context) => {
  const { ids } = ctx.request.body
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new NotFoundError('No user found')
  }

  // Verificar quins usuaris existeixen a la base de dades
  const verifyResult = await db('user')
    .select('id', 'deleted_at')
    .whereIn('id', ids)

  const existingIds = verifyResult.map((row) => row.id)

  if (existingIds.length === 0) {
    throw new NotFoundError('No user found')
  }

  // Filtrar els usuaris que no han estat esborrats
  const toBeDeletedUser: string[] = verifyResult
    .filter((row) => row.deleted_at === null)
    .map((row) => row.id)

  // Si hi ha usuaris per esborrar, actualitzar la seva columna 'deleted_at'
  if (toBeDeletedUser.length > 0) {
    await db('user')
      .whereIn('id', toBeDeletedUser)
      .update({ deleted_at: db.fn.now() })
  }

  // Resposta 204: No Content, perquè no hi ha cos a la resposta
  ctx.status = 204
}
