import { Prisma } from '@prisma/client'

export const categories: Prisma.CategoryCreateArgs['data'][] = [
  {
    name: 'React',
  },
  {
    name: 'Javascript',
  },
  {
    name: 'Node',
  },
  {
    name: 'Python',
  },
  {
    name: 'Django',
  },
]
