import { prisma } from '../src/prisma/client'
import { users } from './data/users'
import { topics } from './data/topics'
import { resources } from './data/resources'

async function seedDB() {
  await prisma.user.createMany({
    data: users,
  })

  await prisma.topic.createMany({
    data: topics,
  })

  const user = await prisma.user.findUnique({
    where: { email: users[0].email },
  })

  const topicReact = await prisma.topic.findFirst({
    where: { topic: 'React' },
  })

  const resourcesWithUserAndTopic = resources.map((resource) => ({
    ...resource,
    userId: user?.id,
    topicId: topics[0].id,
  }))

  await prisma.resource.createMany({
    data: resourcesWithUserAndTopic,
  })
}
