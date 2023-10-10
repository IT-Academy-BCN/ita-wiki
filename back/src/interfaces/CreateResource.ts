import { RESOURCE_STATUS, RESOURCE_TYPE } from '@prisma/client'

export interface CreateResource {
  title: string
  description: string
  url: string
  resourceType: RESOURCE_TYPE
  status: RESOURCE_STATUS
  categoryId: string
  topics: any
}
