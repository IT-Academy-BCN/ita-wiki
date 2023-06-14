import { Prisma } from '@prisma/client'
import slugify from 'slugify'

export const resources: Omit<Prisma.ResourceCreateArgs['data'], 'userId'>[] = [
  {
    title: 'My resource in React',
    slug: slugify('My resource in React', { lower: true }),
    description: 'Lorem ipsum',
    url: 'http://www.example.com/resource/React.html',
    resourceType: 'BLOG',
    status: 'seen',
  },
  {
    title: 'My resource in Node',
    slug: slugify('My resource in Node', { lower: true }),
    description: 'Lorem ipsum',
    url: 'http://www.example.com/resource/Node.html',
    resourceType: 'BLOG',
    status: 'seen',
  },
  {
    title: 'My second resource in React',
    slug: slugify('My second resource in React', { lower: true }),
    description: 'Lorem ipsum',
    url: 'http://www.example.com/resource/React2.html',
    resourceType: 'VIDEO',
    status: 'not_seen',
  },
  {
    title: 'My resource in Javascript',
    slug: slugify('My resource in Javascript', { lower: true }),
    description: 'Lorem ipsum',
    url: 'http://www.example.com/resource/Javascript.html',
    resourceType: 'TUTORIAL',
    status: 'not_seen',
  },
]
