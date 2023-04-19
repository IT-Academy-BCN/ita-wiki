import { prisma } from '../src/prisma/client'
import { users } from './data/users'
import { topics } from './data/topics'
import { categories } from './data/categories'
import { resources } from './data/resources'

async function seedDB() {
  await prisma.user.createMany({
    data: users,
  })

  await prisma.category.createMany({
    data: categories,
  })

  const userAdmin = await prisma.user.findUnique({
    where: { email: 'admin@admin.com' },
  })

  const categoryReact = await prisma.category.findUnique({
    where: { name: 'React' },
  })

  const categoryNode = await prisma.category.findUnique({
    where: { name: 'Node' },
  })  

  const topicCategories = [categoryReact, categoryNode, categoryReact, categoryNode] 

  const mapedTopics = topics.map((topic, index) => ({
    ...topic,
    categoryId: topicCategories[index]?.id || "",
  }))

  await prisma.topic.createMany({
    data: mapedTopics,
  })
  
  const userRegistered = await prisma.user.findUnique({
    where: { email: 'registered@registered.com' },
  })
  
  const resourceUsers = [userAdmin, userAdmin, userRegistered, userRegistered]
  
  const resourcesWithUser = resources.map((resource, index) => ({
    ...resource,
    userId: resourceUsers[index]?.id || "",
  }))

  // TODO: MAP MANY TO MANY
  /*
  

  */
  await prisma.resource.createMany({
    data: resourcesWithUser,
  })

}


seedDB()