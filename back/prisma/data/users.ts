import { Prisma } from '@prisma/client'

export const users: Prisma.UserCreateArgs['data'][] = [
  {
    name: 'Kevin Mamaqi',
  },
  {
    name: 'Django Unchained',
  },
  {
    name: 'Linux Mint',
  },
]
