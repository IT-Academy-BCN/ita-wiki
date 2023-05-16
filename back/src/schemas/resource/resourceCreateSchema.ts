import { z } from '../../openapi/zod'
import { resourceSchema } from './resourceSchema'

export const resourceCreateSchema = resourceSchema
  .omit({
    id: true,
    slug: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
  })
  .extend({
    // DUDA: topics no puede estar vacío, pero si le pongo un .min(1) al final, da segmentation fault en los tests + npm run dev se queda bloqueado
    topics: z.array(z.string()), // Son las FK
  })
