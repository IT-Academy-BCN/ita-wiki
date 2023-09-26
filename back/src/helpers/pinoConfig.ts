import pino from 'pino'

const logFileStream = pino.destination('./src/static/logs/pino.log')

const config = pino(
  {
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }),
    },
  },
  pino.multistream([{ stream: process.stdout }, { stream: logFileStream }])
)

export const logger = (info: any) => {
  config.error(info)
}

export const fatal = (error: any) => {
  config.fatal(error)
}
