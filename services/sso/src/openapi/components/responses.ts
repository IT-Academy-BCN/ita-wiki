import { dashboardUsersListSchema, userSchema } from '../../schemas'
import { z } from '../zod'
import {
  DeletedUser,
  EmailDniError,
  ForbiddenError,
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
  description: 'Invalid token or missing token',
  content: {
    'application/json': {
      schema: z.union([InvalidTokenError, MissingTokenError]),
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

export const usersNotFoundResponse = {
  description: 'Users not found',
  content: {
    'application/json': {
      schema: z.object({
        message: z
          .string()
          .openapi({ example: 'b6z2od3ut12qs0ilem6njgjp not found' }),
      }),
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

export const forbiddenResponse = {
  description: 'Forbidden error',
  content: {
    'application/json': {
      schema: ForbiddenError,
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

export const getDashboardUserResponse = {
  description: 'Token is valid and user information is returned.',
  content: {
    'application/json': {
      schema: userSchema.pick({ dni: true, email: true }),
    },
  },
}

export const listUsersIdNameResponse = {
  description: 'Token is valid and user information is returned.',
  content: {
    'application/json': {
      schema: z.array(userSchema.pick({ id: true, name: true })),
    },
  },
}

export const listDashboardUsersResponse = {
  description: 'Token is valid and user information is returned.',
  content: {
    'application/json': {
      schema: dashboardUsersListSchema,
    },
  },
}

export const deletedUsersResponse = {
  description: 'User is already soft deleted.',
  content: {
    'application/json': {
      schema: DeletedUser,
    },
  },
}
