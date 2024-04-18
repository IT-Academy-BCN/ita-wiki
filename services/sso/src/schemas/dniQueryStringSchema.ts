import { z } from '../openapi/zod'

export const dniQueryStringSchema = z.string().min(2).max(9)
