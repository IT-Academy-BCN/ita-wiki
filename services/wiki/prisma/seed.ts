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
  if (!categoryReact) throw new Error('Category React not found')
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
      },
      {
        ...users[1],
      },
      {
        ...users[2],
      },
    ],
  })

  const userAdmin = await prisma.user.findFirst({
    where: { id: users[0].id },
  })

  const userMentor = await prisma.user.findFirst({
    where: { id: users[1].id },
  })

  const userRegistered = await prisma.user.findFirst({
    where: { id: users[2].id },
  })

  const topicCategories = [
    categoryReact,
    categoryNode,
    categoryReact,
    categoryJavascript,
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

  const stylesTopic = await prisma.topic.findFirst({
    where: { name: 'Estilos' },
  })

  const firstResource = await prisma.resource.findFirst({
    where: { title: 'My resource in React' },
  })

  const secondResource = await prisma.resource.findFirst({
    where: { title: 'My resource in Node' },
  })

  const thirdResource = await prisma.resource.findFirst({
    where: { title: 'My resource in Javascript' },
  })

  const fourthResource = await prisma.resource.findFirst({
    where: { title: 'My second resource in React' },
  })

  const topicsOnResources = [
    {
      topicId: listasTopic?.id || '',
      resourceId: firstResource?.id || '',
    },
    {
      topicId: eventosTopic?.id || '',
      resourceId: secondResource?.id || '',
    },
    {
      topicId: stylesTopic?.id || '',
      resourceId: thirdResource?.id || '',
    },
    {
      topicId: listasTopic?.id || '',
      resourceId: fourthResource?.id || '',
    },
  ]

  await prisma.topicsOnResources.createMany({
    // @ts-ignore
    data: topicsOnResources,
  })
}

seedDB()
