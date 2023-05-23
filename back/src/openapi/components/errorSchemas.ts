import { registry } from '../registry'
import { z } from '../zod'

export const DniError = registry.register(
  'DniError',
  z.object({
    message: z.string().openapi({ example: 'DNI already exists' }),
  })
)

export const EmailError = registry.register(
  'EmailError',
  z.object({
    message: z.string().openapi({ example: 'Email already exists' }),
  })
)

export const MissingTokenError = registry.register(
  'MissingTokenError',
  z.object({
    error: z.string().openapi({ example: 'Unauthorized: Missing token' }),
  })
)

export const InvalidTokenError = registry.register(
  'InvalidTokenError',
  z.object({
    error: z.string().openapi({ example: 'Token is not valid' }),
  })
)

export const MissingUserError = registry.register(
  'MissingUserError',
  z.object({
    message: z.string().openapi({ example: 'User not found' }),
  })
)

export const ValidationError = registry.register(
  'ValidationError',
  z
    .array(
      z.object({
        code: z.string().openapi({ example: 'invalid_string' }),
        message: z.string().openapi({ example: 'Invalid' }),
        path: z.array(z.string().openapi({ example: 'dni' })),
        validation: z.string().optional().openapi({ example: 'regex' }),
        expected: z.string().optional().openapi({ example: 'string' }),
        received: z.string().optional().openapi({ example: 'undefined' }),
      })
    )
    .openapi({
      example: [
        {
          validation: 'regex',
          code: 'invalid_string',
          message: 'Invalid',
          path: ['body', 'dni'],
        },
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['body', 'password'],
          message: 'Required',
        },
      ],
    })
)
