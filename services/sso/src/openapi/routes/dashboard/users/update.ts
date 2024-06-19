import z from 'zod'
import { pathRoot } from '../../../../routes/routes'
import { invalidCredentialsResponse } from '../../../components/responses'
import { registry } from '../../../registry'
import { cookieAuth } from '../../../components/cookieAuth'
import { userIdSchema } from '../../../../schemas/users/userSchema'
import { dashboardUserUpdateSchema } from '../../../../schemas/users/dashboardUserUpdateSchema'

registry.registerPath({
  method: 'patch',
  tags: ['dashboard'],
  path: `${pathRoot.v1.dashboard.users}/{id}`,
  description:
    'Updates specific fields of a user. Mentors can only update users from the same itinerary and cannot modify the role field.',
  summary: 'Update user information',
  security: [{ [cookieAuth.name]: [] }],
  request: {
    params: z.object({ id: userIdSchema }),
    body: {
      required: true,
      description:
        'Updates an existing user. The ID is mandatory, and all other fields are optional. Provide only the fields that need to be updated.',
      content: {
        'application/json': {
          schema: dashboardUserUpdateSchema,
        },
      },
    },
  },

  responses: {
    204: {
      description: 'User has been updated',
    },
    400: {
      description: 'Invalid request',
      content: {
        'application/json': {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: 'No valid fields provided for update' }),
          }),
        },
      },
    },
    401: invalidCredentialsResponse,
    403: {
      description: 'Forbidden',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({
              example:
                'Mentors can only update users from the same itinerary or Mentors cannot modify the role field',
            }),
          }),
        },
      },
    },
    404: {
      description: 'User not found',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'User not found' }),
          }),
        },
      },
    },
    500: {
      description: 'Other error',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'Database error' }),
          }),
        },
      },
    },
  },
})
