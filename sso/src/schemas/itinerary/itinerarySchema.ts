import { z } from '../../openapi/zod'

export const itinerarySchema = z.array(
  z.object({
    id: z.string().cuid2(),
    name: z.string().openapi({ example: 'Frontend Angular' }),
    slug: z.string().openapi({ example: 'frontend-angular' }),
  })
)
