import { Prisma } from '@prisma/client'

export const resources: Omit<
  Prisma.ResourceCreateArgs['data'],
  'userId'
>[] = [
  {
    title: 'My resource in React',
    description: 'Lorem ipsum',
    url: 'http://www.example.com/resource/React.html',
    resourceType: 'BLOG',
  },
  {
    title: 'My resource in Node',
    description: 'Lorem ipsum',
    url: 'http://www.example.com/resource/Node.html',
    resourceType: 'BLOG',
  },
  {
    title: 'My second resource in React',
    description: 'Lorem ipsum',
    url: 'http://www.example.com/resource/React2.html',
    resourceType: 'VIDEO',
  },
  {
    title: 'My resource in Javascript',
    description: 'Lorem ipsum',
    url: 'http://www.example.com/resource/Javascript.html',
    resourceType: 'TUTORIAL',
  },
]
