import { RESOURCE_TYPE } from '@prisma/client'
import { z } from '../openapi/zod'

export const ResourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  url: z.string().url(),
  resource_type: z.nativeEnum(RESOURCE_TYPE),
  topics: z.object({
    connect: z.array(
      z.object({
        id: z.string()
      })
    )
  }),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})
