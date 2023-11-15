import { Context, Next } from 'koa'
import { z } from 'zod'

const validate = (schema: z.Schema) => async (ctx: Context, next: Next) => {
  await schema.parse({
    body: ctx.request.body,
    params: ctx.params,
  })
  return next()
}

const parse = (schema: z.Schema) => async (ctx: Context, next: Next) => {
  const parsed = await schema.parse({
    body: ctx.request.body,
    params: ctx.params,
  })
  ctx.request.body = parsed.body
  ctx.query = parsed.query
  ctx.params = parsed.params
  return next()
}

export { validate, parse }
