import { Prisma } from '@prisma/client'

export const users: Prisma.UserCreateArgs['data'][] = [
  {
    name: 'Kevin Mamaqi',
    status: 'ACTIVE',
  },
  {
    name: 'Django Unchained',
    status: 'ACTIVE',
  },
  {
    name: 'Linux Mint',
    status: 'ACTIVE',
  },
]
