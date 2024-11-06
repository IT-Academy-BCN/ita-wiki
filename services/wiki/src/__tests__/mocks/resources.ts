import { Prisma } from '@prisma/client'
import cuid from 'cuid'

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
const id1 = cuid()
const id2 = cuid()
const id3 = cuid()
export const knexResourceTestDataUpdated = [
  {
    id: id1,
    title: 'test-resource-1-blog',
    slug: 'test-resource-1-blogs',
    description: 'Lorem ipsum blog',
    url: 'https://sample.com',
    resource_type: 'BLOG',
    created_at: new Date('2022-01-01'),
    updated_at: new Date('2022-01-02'),
  },
  {
    id: id2,
    title: 'test-resource-2-video',
    slug: 'test-resource-2-videos',
    description: 'Lorem ipsum video',
    url: 'https://sample.com',
    resource_type: 'VIDEO',
    created_at: new Date('2022-01-01'),
    updated_at: new Date('2022-01-02'),
  },
  {
    id: id3,
    title: 'test-resource-3-tutorial',
    slug: 'test-resource-3-tutorials',
    description: 'Lorem ipsum tutorial',
    url: 'https://sample.com',
    resource_type: 'TUTORIAL',
    created_at: new Date('2022-01-01'),
    updated_at: new Date('2022-01-02'),
  },
]
