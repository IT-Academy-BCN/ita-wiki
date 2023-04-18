import { Prisma } from '@prisma/client'

export const users: Prisma.UserCreateArgs['data'][] = [
  {
    name: 'Guillem Parrado',
    email: 'gp@example.com',
    password: 'password1',
    dni: '12345678A',
    status: 'ACTIVE',
  },
  {
    name: 'Iván Legrán',
    email: 'il@example.com',
    password: 'password2',
    dni: '23456789B',
    status: 'ACTIVE',
  },
  {
    name: 'Oriol Sastre',
    email: 'os@example.com',
    password: 'password3',
    dni: '34567891C',
    status: 'ACTIVE',
  },
  {
    name: 'Cristina Carrillo',
    email: 'cc@example.com',
    password: 'password4',
    dni: '45678912D',
    status: 'ACTIVE',
  },
  {
    name: 'Dani Morera',
    email: 'dm@example.com',
    password: 'password5',
    dni: '56789123E',
    status: 'ACTIVE',
  },
  {
    email: 'test@example.com',
    password: 'password1',
    name: 'Test User',
    dni: '45632452a',
    status: 'ACTIVE',
  },
]
