import z from 'zod'
import { TSupportedLanguage } from '../../db/knexTypes'

const generateHFDescriptionSchema = z.object({
  url: z.string(),
  title: z.string(),
  topic: z.string(),
  language: z.enum([
    TSupportedLanguage.Spanish,
    TSupportedLanguage.English,
    TSupportedLanguage.Catalan,
  ]),
})

export default generateHFDescriptionSchema
