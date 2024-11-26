import { TCleanTextOptions } from '../db/knexTypes'

export const trimDoubleBackspace = (data: string): string => {
  return data.replace(/\n{2,}/g, '\n')
}

export const extractSummary = (
  data: string,
  options: TCleanTextOptions,
  title?: string
): string => {
  if (typeof data !== 'string') {
    return ''
  }
  const prefix = options.titleIncluded
    ? `${options.summaryPrefix} ${title}:\n`
    : `${options.summaryPrefix}\n`
  const summaryIndex = data.indexOf(prefix)
  if (summaryIndex !== -1) {
    return data.substring(summaryIndex + prefix.length).trim()
  }
  return data
}
