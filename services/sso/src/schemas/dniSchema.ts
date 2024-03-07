import { z } from '../openapi/zod'
import { isValidDNILetter } from '../utils/isValidDNILetter'

const validNIEPrefixes = ['X', 'Y', 'Z']
const validDNIPrefixes = [...Array(23).keys()].map((i) => (i + 1).toString())

const DNI_REGEX = /^(([XYZ]\d{7,8})|(\d{8}))[A-Z]$/i

export const dniSchema = z
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
  .refine((value) => isValidDNILetter(value), {
    message: 'Invalid DNI/NIE letter',
  })
  .openapi({
    type: 'string',
  })
