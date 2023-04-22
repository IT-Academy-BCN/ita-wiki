import { userRegisterSchema } from '../../../schemas'
import { registry } from '../../registry'
import { z } from '../../zod'
import { DniError, EmailError, ValidationError } from '../../components/errorSchemas'
import { appConfig } from '../../../config/config'


const prefix = '/auth'

registry.registerPath({
  method: 'post',
  tags: ['auth'],
  path: `${appConfig.pathRoot}${prefix}/register`,
  description:
    'Takes a DNI, a password, a name and an email an registers a user to the system',
  summary: 'Registers a new user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: userRegisterSchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'The user has been registered',
    },
    400: {
      description: 'Invalid input',
      content: {
        'application/json': {
          schema: z.union([ValidationError, DniError, EmailError]),
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
