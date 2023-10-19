/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client'

async function populateResourceProperty() {
  const prisma = new PrismaClient()
  try {
    const resourcesData = await prisma.resource.findMany({
      include: {
        topics: {
          include: { topic: { include: { category: {} } } },
        },
      },
    })
    const resourcesWithTopics = resourcesData.filter(
      (resource) => resource.topics.length !== 0
    )

    const topicsCategory = resourcesWithTopics.map(
      (resource) => resource.topics[0].topic.categoryId
    )

    await Promise.all(
      resourcesWithTopics.map(async (resource, index) => {
        const categoryId = topicsCategory[index % topicsCategory.length]

        await prisma.resource.update({
          where: { id: resource.id },
          data: {
            categoryId,
          },
        })
      })
    )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error populating category property:', error)
  } finally {
    await prisma.$disconnect()
  }
}

populateResourceProperty()
