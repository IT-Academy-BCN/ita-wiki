import { Prisma } from '@prisma/client'

export const users: Prisma.UserCreateArgs['data'][] = [
  {
    name: 'Kevin Mamaqi',
    status: 'ACTIVE',
    role: 'ADMIN',
    specializationId: '',
  },
  {
    name: 'Django Unchained',
    status: 'ACTIVE',
    role: 'REGISTERED',
    specializationId: '',
  },
  {
    name: 'Linux Mint',
    status: 'ACTIVE',
    role: 'MENTOR',
    specializationId: '',
  },
]
