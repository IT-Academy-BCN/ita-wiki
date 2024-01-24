import { userPatchSchema } from '..'
import { z } from '../../openapi/zod'
import { ssoLoginResponseSchema } from './ssoLogin'

const ssoPatchUserRequestSchema = ssoLoginResponseSchema
  .pick({
    authToken: true,
  })
  .merge(userPatchSchema)
export type TSsoPatchUserRequest = z.infer<typeof ssoPatchUserRequestSchema>
