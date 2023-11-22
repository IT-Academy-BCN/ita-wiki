import { z } from '../../openapi/zod'

export const tokenSchema = z.object({
  authToken: z.string().nonempty(),
  refreshToken: z.string().nonempty(),
})
