import { Prisma } from "@prisma/client";

export const users: Prisma.UserCreateArgs['data'][] = [
  {
    email: 'admin@admin.com',
    password: 'password1',
    name: 'Kevin Mamaqi',
    dni: '12345678A',
    status: 'ACTIVE',
    // Faltará type: "admin" cuando esté disponible en main
  },
  {
    email: 'registered@registered.com',
    password: 'password2',
    name: 'Django Unchained',
    dni: '23456789B',
    status: 'ACTIVE',
    // Faltará type: "registered" cuando esté disponible en main
  }
]
