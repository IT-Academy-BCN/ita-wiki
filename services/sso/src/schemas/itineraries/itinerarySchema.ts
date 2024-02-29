import { z } from '../../openapi/zod'

export const itineraryNameSchema = z
  .string()
  .openapi({ example: 'Frontend Angular' })
export const itinerarySlugSchema = z
  .string()
  .openapi({ example: 'frontend-angular' })
export const itinerarySchema = z.object({
  id: z.string().cuid2(),
  name: itineraryNameSchema,
  slug: itinerarySlugSchema,
})
