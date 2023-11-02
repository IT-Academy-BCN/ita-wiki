import { Context, Next } from 'koa'
import qs, { ParsedQs } from 'qs'
import { ParsedUrlQuery } from 'querystring'
import { z } from 'zod'

const validate =
  (
    schema: z.Schema,
    options?: { useQueryString?: boolean; useQsParser?: boolean }
  ) =>
  async (ctx: Context, next: Next) => {
    let source: ParsedQs | string | ParsedUrlQuery = options?.useQueryString
      ? ctx.querystring
      : ctx.query
    if (options?.useQsParser && typeof source === 'string') {
      source = qs.parse(ctx.querystring)
    }
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
    let source: ParsedQs | string | ParsedUrlQuery = options?.useQueryString
      ? ctx.querystring
      : ctx.query
    if (options?.useQsParser && typeof source === 'string') {
      source = qs.parse(ctx.querystring)
    }
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
