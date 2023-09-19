import pino from 'pino'

export const logger = pino({
  level: 'info', // Adjust the log level as needed (e.g., 'info', 'error', 'debug')
})
