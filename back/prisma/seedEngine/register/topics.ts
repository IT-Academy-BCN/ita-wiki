import { prisma } from '../../../src/prisma/client'
import { TopicSchema } from '../../../src/schemas'
import { Data } from '../types'
import { validateMany } from '../validateMany'

export const registerTopics = async (data: Data) => {
  const { topics } = data

  validateMany(
    topics,
    TopicSchema.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
    })
  )

  // eslint-disable-next-line no-param-reassign
  data.topics = await prisma.$transaction(
    topics.map((topic) => prisma.topic.create({ data: topic }))
  )
}
