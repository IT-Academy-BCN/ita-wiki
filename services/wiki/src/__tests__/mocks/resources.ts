import { Prisma } from '@prisma/client'

export const resourceTestData: Omit<
  Prisma.ResourceCreateArgs['data'],
  'userId' | 'categoryId'
>[] = [
  {
    title: 'test-resource-1-blog',
    slug: 'test-resource-1-blog',
    description: 'Lorem ipsum blog',
    url: 'https://sample.com',
    resourceType: 'BLOG',
  },
  {
    title: 'test-resource-2-video',
    slug: 'test-resource-2-video',
    description: 'Lorem ipsum video',
    url: 'https://sample.com',
    resourceType: 'VIDEO',
  },
  {
    title: 'test-resource-3-tutorial',
    slug: 'test-resource-3-tutorial',
    description: 'Lorem ipsum tutorial',
    url: 'https://sample.com',
    resourceType: 'TUTORIAL',
  },
]

export const knexResourceTestData = resourceTestData.map((resource) => {
  const { resourceType, ...rest } = resource
  return {
    ...rest,
    resource_type: resource.resourceType,
    created_at: new Date(),
    updated_at: new Date(),
  }
})
