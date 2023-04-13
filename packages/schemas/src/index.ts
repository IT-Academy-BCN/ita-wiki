import { z } from "zod";

const validNIEPrefixes = ["X", "Y", "Z"];
const validDNIPrefixes = [...Array(23).keys()].map((i) => (i + 1).toString());
const DNI_REGEX = /^(([XYZ]\d{7,8})|(\d{8}))([a-zA-Z])$/i;
const DNISchema = z
  .string()
  .regex(DNI_REGEX)
  .transform((value) => value.toUpperCase())
  .refine((value) => {
    const firstLetter = value.charAt(0);
    return (
      validDNIPrefixes.includes(firstLetter) ||
      validNIEPrefixes.includes(firstLetter)
    );
  });

export const UserLoginSchema = z.object({
  dni: DNISchema,
  password: z.string().min(8),
});
