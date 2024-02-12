import { z } from '../../openapi/zod'
import { userIdSchema } from './userSchema'

const fieldsSchema = z.enum(['id', 'name'])
export const usersListSchema = z
  .object({
    id: z.array(userIdSchema).openapi({
      param: {
        required: true,
        description: 'user id',
        explode: false,
      },
    }),
    fields: fieldsSchema.array().openapi({
      param: {
        required: false,
        description: 'Specify fields to return (id, name)',
        explode: false,
        in: 'query',
      },
    }),
  })
  .strict()
export type UsersList = z.infer<typeof usersListSchema>
