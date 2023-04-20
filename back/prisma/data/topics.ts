import { Prisma } from '@prisma/client'

export const topics: Prisma.TopicCreateArgs['data'][] = [
  {
    topic: 'React',
  },
  {
    topic: 'Javascript',
  },
  {
    topic: 'Node',
  },
  {
    topic: 'Python',
  },
  {
    topic: 'Django',
  },
]
