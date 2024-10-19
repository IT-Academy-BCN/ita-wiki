import { z } from 'zod'
import { tokenSchema } from './tokenSchema'

export const validateSchema = tokenSchema.pick({ authToken: true }).strict()

export type TValidateSchema = z.infer<typeof validateSchema>
