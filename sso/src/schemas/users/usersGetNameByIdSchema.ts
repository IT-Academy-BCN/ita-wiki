import { z } from '../../openapi/zod'
import { userIdSchema } from '../user/userSchema'

export const usersGetNameByIdParamSchema = z.object({
  id: z.array(userIdSchema).openapi({
    param: {
      required: true,
      description: 'user id',
      explode: false,
    },
  }),
})
export type UsersGetId = z.infer<typeof usersGetNameByIdParamSchema>
