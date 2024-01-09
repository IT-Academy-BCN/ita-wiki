import { Prisma } from '@prisma/client'

export const users: Prisma.UserCreateArgs['data'][] = [
  {
    name: 'Kevin Mamaqi',
    status: 'ACTIVE',
    role: 'ADMIN',
  },
  {
    name: 'Django Unchained',
    status: 'ACTIVE',
    role: 'REGISTERED',
  },
  {
    name: 'Linux Mint',
    status: 'ACTIVE',
    role: 'MENTOR',
  },
]
