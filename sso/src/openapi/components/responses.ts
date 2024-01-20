import { userSchema } from '../../schemas'
import { z } from '../zod'
import {
  EmailDniError,
  InvalidCredentials,
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
export const duplicateResponse = {
  description: 'Email or User already exist',
  content: {
    'application/json': {
      schema: EmailDniError,
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
export const invalidCredentialsResponse = {
  description: 'Invalid Credentials error',
  content: {
    'application/json': {
      schema: InvalidCredentials,
    },
  },
}

export const invalidItineraryResponse = {
  description: 'Invalid itinerary ID',
  content: {
    'application/json': {
      schema: z.object({
        message: z.string().openapi({ example: 'Invalid itinerary' }),
      }),
    },
  },
}
export const registerResponse = {
  description: 'The user has been registered.',
  content: {
    'application/json': {
      schema: userSchema.pick({ id: true }),
    },
  },
}

export const validTokenResponse = {
  description: 'The token is valid',
  content: {
    'application/json': {
      schema: userSchema.pick({ id: true }),
    },
  },
}

export const getUserResponse = {
  description: 'Token is valid and user information is returned.',
  content: {
    'application/json': {
      schema: userSchema.pick({ dni: true, email: true, role: true }),
    },
  },
}
