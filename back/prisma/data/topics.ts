import { Prisma } from '@prisma/client'

export const topics: Omit<
  Prisma.TopicCreateArgs['data'],
  'categoryId'
>[] = [
  {
    name: "Components",
  },
  {
    name: "Eventos",
  },
  {
    name: "Listas",
  },
  {
    name: "Estilos",
  }
]
