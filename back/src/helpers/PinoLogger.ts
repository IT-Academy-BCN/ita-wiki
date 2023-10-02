import pino from 'pino'

export class PinoLogger {
  private readonly logger: pino.Logger

  constructor(logger: pino.Logger) {
    this.logger = logger
  }

  logError(error: any) {
    this.logger.error(error)
  }
}
