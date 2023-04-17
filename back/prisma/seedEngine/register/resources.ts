import { prisma } from '../../../src/prisma/client'
import { ResourceSchema } from '../../../src/schemas'
import { Data } from '../types'
import { validateMany } from '../validateMany'

export const registerResources = async (data: Data) => {

  // FK Mapping
  const resources = data.resources.map((resource) => ({
    ...resource,
    topicId: data.topics[resource.topicId].id,
    userId: data.users[resource.userId].id
  }))

  validateMany(
    resources,
    ResourceSchema.omit({
      id: true,
      createdAt: true,
      updatedAt: true
    })
  )

  // eslint-disable-next-line no-param-reassign
  data.resources = await prisma.$transaction(
    resources.map((resource) => prisma.resource.create({ data: resource }))
  )
}
