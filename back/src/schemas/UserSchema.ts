import { z } from '../openapi/zod'

const validNIEPrefixes = ['X', 'Y', 'Z']
const validDNIPrefixes = [...Array(23).keys()].map((i) => (i + 1).toString())

const DNI_REGEX = /^(([XYZ]\d{7,8})|(\d{8}))([a-zA-Z])$/i

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  dni: z
    .string()
    .regex(DNI_REGEX)
    .transform((value) => value.toUpperCase())
    .refine((value) => {
      const firstLetter = value.charAt(0)
      return (
        validDNIPrefixes.includes(firstLetter) ||
        validNIEPrefixes.includes(firstLetter)
      )
    })
    .openapi({
      type: 'string',
    }),
})
