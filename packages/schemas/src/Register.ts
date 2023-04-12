import { z } from "zod";

const validNIEPrefixes = ["X", "Y", "Z"];
const validDNIPrefixes = [...Array(23).keys()].map((i) => (i + 1).toString());
const DNI_REGEX = /^(([XYZ]\d{7,8})|(\d{8}))([a-zA-Z])$/i;
const DNISchema = z
  .string({ required_error: "El campo es requerido" })
  .regex(DNI_REGEX)
  .transform((value) => value.toUpperCase())
  .refine((value) => {
    const firstLetter = value.charAt(0);
    return (
      validDNIPrefixes.includes(firstLetter) ||
      validNIEPrefixes.includes(firstLetter)
    );
  });

const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const UserRegisterSchema = z
  .object({
    dni: DNISchema,
    email: z
      .string({ required_error: "Este campo es obligatorio" })
      .min(1, { message: "Este campo es obligatorio" })
      .email("Debe ser un correo válido"),
    name: z
      .string({ required_error: "Este campo es obligatorio" })
      .min(1, { message: "Este campo es obligatorio" }),
    specialization: z.string({ required_error: "Este campo es obligatorio" }),
    password: z
      .string({ required_error: "Este campo es obligatorio" })
      .min(8, { message: "La contraseña debe tener mínimo 8 caracteres" })
      .regex(new RegExp(passRegex), {
        message:
          "La contraseña debe contener al menos un número, mayúsculas y minúsculas",
      }),
    confirmPassword: z.string({ required_error: "Este campo es obligatorio" }),
    accept: z.boolean({
      required_error: "Es necesario aceptar los términos legales",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas deben ser iguales",
  });
