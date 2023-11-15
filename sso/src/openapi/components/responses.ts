import { z } from '../zod'
import {
  InvalidTokenError,
  MissingTokenError,
  NotFoundError,
  ValidationError,
} from './errorSchemas'

// Responses for when the authMiddlware intervenes.

export const missingTokenResponse = {
  description: 'Missing token',
  content: {
    'application/json': {
      schema: MissingTokenError,
    },
  },
}

export const invalidTokenResponse = {
  description: 'Invalid token',
  content: {
    'application/json': {
      schema: InvalidTokenError,
    },
  },
}

export const userNotFoundResponse = {
  description: 'User not found',
  content: {
    'application/json': {
      schema: NotFoundError,
    },
  },
}

export const zodValidationResponse = {
  description: 'Zod validation error',
  content: {
    'application/json': {
      schema: ValidationError,
    },
  },
}

export const invalidPasswordResponse = {
  description: 'Invalid password',
  content: {
    'application/json': {
      schema: z.object({
        message: z.string().openapi({ example: 'Invalid password' }),
      }),
    },
  },
}