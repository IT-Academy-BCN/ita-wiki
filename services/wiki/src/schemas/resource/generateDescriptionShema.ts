import z from 'zod'
import { knexResourceSchema } from './resourceSchema'

const extendedKnexResourceSchema = knexResourceSchema.extend({
  topic: z.string().openapi({ example: 'Web Development' }),
  language: z.enum(['en', 'es', 'ca']).openapi({ example: 'en' }),
})

export const generateDescriptionSchema = extendedKnexResourceSchema.pick({
  url: true,
  title: true,
  topic: true,
  language: true,
})
