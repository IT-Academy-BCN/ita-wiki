import pino from 'pino'

const logFileStream = pino.destination('./src/static/logs/pino.log')

export const config = pino(
  {
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }),
    },
  },
  pino.multistream([{ stream: process.stdout }, { stream: logFileStream }])
)
