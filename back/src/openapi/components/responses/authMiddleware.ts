import { InvalidTokenError, MissingTokenError } from '../errorSchemas'

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