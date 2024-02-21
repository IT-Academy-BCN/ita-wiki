import { Context, Next } from 'koa'
import qs, { ParsedQs } from 'qs'
import { ParsedUrlQuery } from 'querystring'
import { z } from 'zod'

type QueryOptions = {
  useQueryString?: boolean
  useQsParser?: boolean
  arrayParams?: string[]
}

const defaultOptions: QueryOptions = {
  useQueryString: false,
  useQsParser: false,
}

const getQuerySource = (
  ctx: Context,
  options: QueryOptions = {}
): ParsedQs | ParsedUrlQuery | string => {
  const { useQueryString, useQsParser, arrayParams } = {
    ...defaultOptions,
    ...options,
  }
  const source: string | ParsedUrlQuery = useQueryString
    ? ctx.querystring
    : ctx.query
  if (useQsParser && typeof source === 'string') {
    const decodeQuery = decodeURIComponent(source)
    let parsedQs = qs.parse(decodeQuery, { comma: true })
    if (!arrayParams) {
      return parsedQs
    }
    parsedQs = arrayParams.reduce((acc, param) => {
      const value = acc[param]
      const newValue = typeof value === 'string' ? [value] : value
      return { ...acc, [param]: newValue }
    }, parsedQs)
    return parsedQs
  }
  return source
}

const validate =
  (schema: z.Schema, options: QueryOptions = {}) =>
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
  (schema: z.Schema, options: QueryOptions = {}) =>
  async (ctx: Context, next: Next) => {
    const source = getQuerySource(ctx, options)
    const parsed = await schema.parse({
      body: ctx.request.body,
      query: source,
      params: ctx.params,
    })
    ctx.request.body = parsed.body
    ctx.query = parsed.query
    ctx.state.query = parsed.query
    ctx.params = parsed.params
    return next()
  }

export { validate, parse }
