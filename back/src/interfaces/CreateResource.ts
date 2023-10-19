import { RESOURCE_TYPE } from '@prisma/client'

export interface CreateResource {
  title: string
  description: string
  url: string
  resourceType: RESOURCE_TYPE
  categoryId: string
  topics: any
}
