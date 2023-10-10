import { prisma } from '../src/prisma/client'
import { users } from './data/users'
import { topics } from './data/topics'
import { categories } from './data/categories'
import { resources } from './data/resources'

async function seedDB() {
  await prisma.category.createMany({
    data: categories,
  })

  const categoryReact = await prisma.category.findUnique({
    where: { name: 'React' },
  })

  const categoryNode = await prisma.category.findUnique({
    where: { name: 'Node' },
  })

  const categoryJavascript = await prisma.category.findUnique({
    where: { name: 'Javascript' },
  })

  await prisma.user.createMany({
    data: [
      {
        ...users[0],
        specializationId: categoryReact!.id,
      },
      {
        ...users[1],
        specializationId: categoryReact!.id,
      },
      {
        ...users[2],
        specializationId: categoryNode!.id,
      },
    ],
  })

  const userAdmin = await prisma.user.findUnique({
    where: { email: 'admin@admin.com' },
  })

  const userMentor = await prisma.user.findUnique({
    where: { email: 'mentor@mentor.com' },
  })

  const userRegistered = await prisma.user.findUnique({
    where: { email: 'registered@registered.com' },
  })

  const topicCategories = [
    categoryReact,
    categoryNode,
    categoryReact,
    categoryNode,
  ]

  const mapedTopics = topics.map((topic, index) => ({
    ...topic,
    categoryId: topicCategories[index]?.id || '',
  }))

  await prisma.topic.createMany({
    data: mapedTopics,
  })

  const resourceUsers = [
    userAdmin,
    userAdmin,
    userRegistered,
    userRegistered,
    userMentor,
    userMentor,
  ]

  const resourceCategories = [
    categoryReact,
    categoryNode,
    categoryReact,
    categoryJavascript,
  ]

  const resourcesRelations = resources.map((resource, index) => ({
    ...resource,
    userId: resourceUsers[index]?.id || '',
    categoryId: resourceCategories[index]?.id || '',
  }))

  await prisma.resource.createMany({
    data: resourcesRelations,
  })

  // Resources

  const eventosTopic = await prisma.topic.findFirst({
    where: { name: 'Eventos' },
  })

  const listasTopic = await prisma.topic.findFirst({
    where: { name: 'Listas' },
  })

  const firstResource = await prisma.resource.findFirst({
    where: { title: 'My resource in React' },
  })

  const secondResource = await prisma.resource.findFirst({
    where: { title: 'My resource in Node' },
  })

  const topicsOnResources = [
    {
      topicId: eventosTopic?.id || '',
      resourceId: firstResource?.id || '',
    },
    {
      topicId: listasTopic?.id || '',
      resourceId: firstResource?.id || '',
    },
    {
      topicId: eventosTopic?.id || '',
      resourceId: secondResource?.id || '',
    },
    {
      topicId: listasTopic?.id || '',
      resourceId: secondResource?.id || '',
    },
  ]

  await prisma.topicsOnResources.createMany({
    // @ts-ignore
    data: topicsOnResources,
  })
}

seedDB()
