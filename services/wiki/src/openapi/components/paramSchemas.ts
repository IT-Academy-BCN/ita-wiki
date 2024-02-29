import { z } from 'zod'

export const resourceId = z
  .string()
  .trim()
  .min(1)
  .cuid()
  .openapi({
    param: { description: 'ID of the resource to be retrieved.' },
    example: 'cln2u09xo0037s6wvbf6t9jfg',
  })
