import { z } from '../../zod'
import {
  ForbiddenError,
  InvalidTokenError,
  MissingTokenError,
  NotFoundError,
  UpstreamServiceFail,
  ZodValidationError,
} from '../errorSchemas'

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
      schema: z.union([InvalidTokenError, MissingTokenError]),
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

export const userNotFoundResponse = {
  description: 'User not found',
  content: {
    'application/json': {
      schema: NotFoundError,
    },
  },
}
export const upstreamServiceFailResponse = {
  description: 'Upstream service fail',
  content: {
    'application/json': {
      schema: UpstreamServiceFail,
    },
  },
}

export const zodValidationErrorResponse = {
  description: 'Zod validation error',
  content: {
    'application/json': {
      schema: ZodValidationError,
    },
  },
}
