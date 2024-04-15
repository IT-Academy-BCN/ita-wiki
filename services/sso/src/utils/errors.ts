/* eslint max-classes-per-file: 0 */
import { measureMemory } from 'vm'
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
  public message: ZodIssue[]
  constructor(message: ZodIssue[]) {
    this.status = 400
    this.message = message
  }
}
class InvalidCredentials extends DefaultError {
  constructor(message: string = 'Invalid Credentials') {
    super(401, `${message}`)
  }
}
class UnauthorizedError extends DefaultError {
  constructor(message: string = 'Missing token') {
    super(401, `${message}`)
  }
}
class InvalidToken extends DefaultError {
  constructor(message: string = 'Token is not valid') {
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

class DeletedError extends DefaultError {
  constructor(message: string = 'User already deleted') {
    super(410, `${message}`)
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
class InvalidParamError extends DefaultError {
  constructor(parameter: string) {
    super(422, `Invalid ${parameter}`)
  }
}

export {
  DefaultError,
  ValidationError,
  InvalidCredentials,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  DuplicateError,
  UnsupportedMediaType,
  MissingParamError,
  InvalidParamError,
  InvalidToken,
  DeletedError,
}
