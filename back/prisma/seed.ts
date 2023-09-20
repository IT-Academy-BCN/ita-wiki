import { prisma } from '../src/prisma/client'
import { users } from './data/users'
import { topics } from './data/topics'
import { categories } from './data/categories'
import { resources } from './data/resources'

async function seedCategories() {
  await prisma.category.createMany({
    data: categories,
  })
}
async function fetchCategoryIds() {
  return await prisma.category.findMany({
    select: {
      id: true,
    },
  })
}

async function seedUsersWithSpecialization(categoryIds: { id: string }[]) {
  const usersWithSpecialization = users.map((user) => {
    const randomCategoryId =
      categoryIds[Math.floor(Math.random() * categoryIds.length)].id
    return {
      ...user,
      specializationId: randomCategoryId,
    }
  })

  await prisma.user.createMany({
    data: usersWithSpecialization,
  })
}

async function fetchUsersIds() {
  return await prisma.user.findMany({
    select: {
      id: true,
    },
  })
}

async function seedTopicsWithCategories(categoryIds: { id: string }[]) {
  const topicsWithSpecialization = topics.map((topic) => {
    const randomCategoryId =
      categoryIds[Math.floor(Math.random() * categoryIds.length)].id
    return {
      ...topic,
      categoryId: randomCategoryId,
    }
  })

  await prisma.topic.createMany({
    data: topicsWithSpecialization,
  })
}
async function fetchTopicsIds() {
  return await prisma.topic.findMany({
    select: {
      id: true,
    },
  })
}

async function seedResourcesWithUsers(userIds: { id: string }[]) {
  const resourcesWithUsers = resources.map((resource) => {
    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)].id
    return {
      ...resource,
      userId: randomUserId,
    }
  })

  await prisma.resource.createMany({
    data: resourcesWithUsers,
  })
}

async function fetchResourcesIds() {
  return await prisma.resource.findMany({
    select: {
      id: true,
    },
  })
}

async function seedTopicsOnResourcesWithTopicsAndResources(
  topicsIds: { id: string }[],
  resourcesIds: { id: string }[]
) {
  const topicsOnResources = topicsIds.map((topic, index) => ({
    topicId: topic.id,
    resourceId: resourcesIds[index].id,
  }))

  await prisma.topicsOnResources.createMany({
    data: topicsOnResources,
  })
}

async function seedDB() {
  await seedCategories()
  const categoryIds = await fetchCategoryIds()
  await seedUsersWithSpecialization(categoryIds)
  const usersIds = await fetchUsersIds()
  await seedTopicsWithCategories(categoryIds)
  const topicsIds = await fetchTopicsIds()
  await seedResourcesWithUsers(usersIds)
  const resourcesIds = await fetchResourcesIds()
  await seedTopicsOnResourcesWithTopicsAndResources(topicsIds, resourcesIds)
}

seedDB()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
