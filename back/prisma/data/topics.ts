import { Prisma } from '@prisma/client'
import slugify from 'slugify'

export const topics: Omit<
  Prisma.TopicCreateArgs['data'],
  'categoryId'
>[] = [
  {
    name: "Components",
    slug: slugify("Components", { lower: true })
  },
  {
    name: "Eventos",
    slug: slugify("Eventos", { lower: true })
  },
  {
    name: "Listas",
    slug: slugify("Listas", { lower: true })
  },
  {
    name: "Estilos",
    slug: slugify("Estilos", { lower: true })
  }
]
