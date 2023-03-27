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

class NotFoundError extends DefaultError {
  constructor(message: string = 'Not found') {
    super(404, `${message}`)
  }
}

class UnauthorizedError extends DefaultError {
  constructor(message: string = 'Missing token') {
    super(401, `${message}`)
  }
}

class ForbiddenError extends DefaultError {
  constructor() {
    super(403, 'Forbidden')
  }
}

class MissingParamError extends DefaultError {
  constructor(parameter: string) {
    super(422, `Missing ${parameter}`)
  }
}

class UnsupportedMediaType extends DefaultError {
  constructor(message?: string) {
    super(415, message || 'Unsupported media type')
  }
}

class ValidationError extends DefaultError {
  constructor(message?: string) {
    super(400, `${message}`)
  }
}

export {
  NotFoundError,
  DefaultError,
  UnauthorizedError,
  ForbiddenError,
  UnsupportedMediaType,
  MissingParamError,
  ValidationError,
}
