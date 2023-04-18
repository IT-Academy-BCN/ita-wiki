import { UserSchema, TopicSchema, ResourceSchema } from '../src/schemas'
import { prisma } from '../src/prisma/client'
import '../src/prisma/middleware'

async function main() {
  const userData = {
    email: 'test@example.com',
    password: 'password1',
    name: 'Test User',
    dni: '45632452a',
    status: 'ACTIVE',
    role: 'ADMIN'
  }
  const UserSeedSchema = UserSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
  })

  const validatedUserData = UserSeedSchema.parse(userData)

  const user = await prisma.user.create({
    data: validatedUserData
  })
  console.log(user)

  const topicDataArray = [{
    topic: 'React'
  },{
    topic: 'Javascript'
  }]

  const TopicSeedSchema = TopicSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
  })

  const ResourceSeedSchema = ResourceSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
  })

  topicDataArray.forEach(async topicData => {
    const validatedTopicData = TopicSeedSchema.parse(topicData)
    
    const topic = await prisma.topic.create({
      data: validatedTopicData
    })

    const resourceData = {
      title: `My resource in ${topicData.topic}`,
      description: 'Lorem ipsum',
      url: `http://www.example.com/resource/${topicData.topic}.html`,
      resource_type: 'BLOG',
      topicId: topic.id,
      userId: user.id
    }

    const validatedResourceData = ResourceSeedSchema.parse(resourceData)

    await prisma.resource.create({
      data: validatedResourceData
    })

  });

}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
