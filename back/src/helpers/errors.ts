/* eslint max-classes-per-file: 0 */
import { ZodIssue } from 'zod'

/* eslint-disable max-classes-per-file */
class DefaultError extends Error {
  public status: number
  public message: string
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
  }
}

class ValidationError {
  public status: number
  public message: ZodIssue[] | string
  constructor(message: ZodIssue[] | string) {
    this.status = 400
    this.message = message
  }
}

class UnauthorizedError extends DefaultError {
  constructor(message: string = 'Missing token') {
    super(401, `${message}`)
  }
}

class InvalidCredentials extends DefaultError {
  constructor(message: string = 'Invalid credentials') {
    super(401, `${message}`)
  }
}

class ForbiddenError extends DefaultError {
  constructor(message: string = 'Forbidden') {
    super(403, `${message}`)
  }
}

class NotFoundError extends DefaultError {
  constructor(message: string = 'Not found') {
    super(404, `${message}`)
  }
}

class DuplicateError extends DefaultError {
  constructor(resource: string) {
    super(409, `${resource} already exists`)
  }
}

class UnsupportedMediaType extends DefaultError {
  constructor(message?: string) {
    super(415, message ?? 'Unsupported media type')
  }
}

class MissingParamError extends DefaultError {
  constructor(parameter: string) {
    super(422, `Missing ${parameter}`)
  }
}

class InvalidToken extends DefaultError {
  constructor(message: string = 'Token is not valid') {
    super(498, `${message}`)
  }
}

class ServiceUnavailable extends DefaultError {
  constructor(message: string = 'Service Unavailable') {
    super(503, `${message}`)
  }
}

export {
  DefaultError,
  ValidationError,
  UnauthorizedError,
  InvalidCredentials,
  ForbiddenError,
  NotFoundError,
  DuplicateError,
  UnsupportedMediaType,
  MissingParamError,
  InvalidToken,
  ServiceUnavailable,
}
