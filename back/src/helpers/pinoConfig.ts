import pino from 'pino'

export const logger = pino({
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: ['pid', 'hostname'],
    remove: true,
  },
  formatters: {
    level: (label) => ({ level: label }),
  },
})
