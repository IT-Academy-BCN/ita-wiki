import { Context, Next } from 'koa'
import qs, { ParsedQs } from 'qs'
import { ParsedUrlQuery } from 'querystring'
import { z } from 'zod'

const getQuerySource = (
  ctx: Context,
  options?: { useQueryString?: boolean; useQsParser?: boolean }
): ParsedQs | ParsedUrlQuery | string => {
  let source: ParsedQs | string | ParsedUrlQuery = options?.useQueryString
    ? ctx.querystring
    : ctx.query
  if (options?.useQsParser && typeof source === 'string') {
    source = qs.parse(source)
  }
  return source
}

const validate =
  (
    schema: z.Schema,
    options?: { useQueryString?: boolean; useQsParser?: boolean }
  ) =>
  async (ctx: Context, next: Next) => {
    const source = getQuerySource(ctx, options)
    await schema.parse({
      body: ctx.request.body,
      query: source,
      params: ctx.params,
    })
    return next()
  }

const parse =
  (
    schema: z.Schema,
    options?: { useQueryString?: boolean; useQsParser?: boolean }
  ) =>
  async (ctx: Context, next: Next) => {
    const source = getQuerySource(ctx, options)
    const parsed = await schema.parse({
      body: ctx.request.body,
      query: source,
      params: ctx.params,
    })
    ctx.request.body = parsed.body
    ctx.query = parsed.query
    ctx.params = parsed.params
    return next()
  }

export { validate, parse }
