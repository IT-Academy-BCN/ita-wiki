import { Context, Next } from 'koa'
import qs from 'qs'
import { z } from 'zod'

const validate = (schema: z.Schema) => async (ctx: Context, next: Next) => {
  ctx.state.query = qs.parse(ctx.querystring)
  await schema.parse({
    body: ctx.request.body,
    query: ctx.state.query,
    params: ctx.params,
  })
  return next()
}

const parse = (schema: z.Schema) => async (ctx: Context, next: Next) => {
  const parsed = await schema.parse({
    body: ctx.request.body,
    query: ctx.query,
    params: ctx.params,
  })
  ctx.request.body = parsed.body
  ctx.query = parsed.query
  ctx.params = parsed.params
  return next()
}

export { validate, parse }
