import { userPatchSchema } from '..'
import { z } from '../../openapi/zod'
import { ssoLoginResponseSchema } from './ssoLogin'

const ssoUpdateUserRequestSchema = ssoLoginResponseSchema
  .pick({
    authToken: true,
  })
  .merge(userPatchSchema)
export type TSsoUpdateUserRequest = z.infer<typeof ssoUpdateUserRequestSchema>
