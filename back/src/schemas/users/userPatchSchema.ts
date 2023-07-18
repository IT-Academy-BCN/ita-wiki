import { z } from '../../openapi/zod'
import { passwordRegex } from '../regex/passwordRegex'
import { dniSchema } from '../dniSchema'

export const userPatchSchema = z
  .object({
    id: z.string(),
    email: z
      .string()
      .email()
      .openapi({ example: 'user@example.cat' })
      .optional(),
    dni: dniSchema.optional(),
    password: z.string().min(8).regex(passwordRegex).optional(),
    name: z.string().optional().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
    role: z.enum(['ADMIN', 'REGISTERED', 'MENTOR']).optional(),
    specialization: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .strict()
