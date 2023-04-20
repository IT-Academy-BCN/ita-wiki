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

  const userAdmin = await prisma.user.findUnique({
    where: { email: 'admin@admin.com' },
  })

  const userRegistered = await prisma.user.findUnique({
    where: { email: 'registered@registered.com' },
  })

  const topicReact = await prisma.topic.findFirst({
    where: { topic: 'React' },
  })

  const topicNode = await prisma.topic.findFirst({
    where: { topic: 'Node' },
  })

  const resourceUsers = [userAdmin, userAdmin, userRegistered, userRegistered]
  const resourceTopics = [topicReact, topicNode, topicReact, topicNode]

  const resourcesWithUserAndTopic = resources.map((resource, index) => ({
    ...resource,
    userId: resourceUsers[index]?.id || "",
    topicId: resourceTopics[index]?.id || "",
  }))

  await prisma.resource.createMany({
    data: resourcesWithUserAndTopic,
  })
}


seedDB()