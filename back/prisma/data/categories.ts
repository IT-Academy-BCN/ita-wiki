import { Prisma } from '@prisma/client'
import slugify from 'slugify'

export const categories: Prisma.CategoryCreateArgs['data'][] = [
  {
    name: 'React',
    slug: slugify('React', { lower: true }),
  },
  {
    name: 'Javascript',
    slug: slugify('Javascript', { lower: true }),
  },
  {
    name: 'Node',
    slug: slugify('Node', { lower: true }),
  },
  {
    name: 'Python',
    slug: slugify('Python', { lower: true }),
  },
  {
    name: 'Django',
    slug: slugify('Django', { lower: true }),
  },
]
