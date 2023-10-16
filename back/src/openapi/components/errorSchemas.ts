import { registry } from '../registry'
import { z } from '../zod'

export const DniError = registry.register(
  'DniError',
  z.object({
    message: z.string().openapi({ example: 'dni already exists' }),
  })
)

export const EmailError = registry.register(
  'EmailError',
  z.object({
    message: z.string().openapi({ example: 'email already exists' }),
  })
)

export const InputError = registry.register(
  'InputError',
  z.object({
    message: z.string().openapi({ example: 'Input is not a string' }),
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
    message: z.string().openapi({ example: 'Token is not valid' }),
  })
)
export const ForbiddenError = registry.register(
  'ForbiddenError',
  z.object({
    message: z.string().openapi({ example: 'Forbidden' }),
  })
)

export const NotFoundError = registry.register(
  'MissingUserError',
  z.object({
    message: z.string().openapi({ example: 'User not found' }),
  })
)

export const ValidationError = registry.register(
  'ValidationError',
  z.object({
    message: z.array(
      z.object({
        code: z.string().openapi({ example: 'invalid_string' }),
        message: z.string().openapi({ example: 'Invalid' }),
        path: z.array(z.string().openapi({ example: 'dni' })),
        validation: z.string().optional().openapi({ example: 'regex' }),
        expected: z.string().optional().openapi({ example: 'string' }),
        received: z.string().optional().openapi({ example: 'undefined' }),
        options: z
          .array(z.string())
          .optional()
          .openapi({ example: ['BLOG', 'VIDEO', 'TUTORIAL'] }),
      })
    ),
  })
)
