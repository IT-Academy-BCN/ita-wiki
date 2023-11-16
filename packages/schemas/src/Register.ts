import { z } from "zod";

const validNIEPrefixes = ["X", "Y", "Z"];
const validDNIPrefixes = [...Array(23).keys()].map((i) => (i + 1).toString());
const DNI_REGEX = /^(([XYZ]\d{7,8})|(\d{8}))([a-zA-Z])$/i;
const DNISchema = z
  .string()
  .min(1, { message: "Este campo es obligatorio" })
  .regex(DNI_REGEX, { message: "Debe ser un valor válido" })
  .transform((value) => value.toUpperCase())
  .refine((value) => {
    const firstLetter = value.charAt(0);
    const letter = value.slice(-1);
    const validLetters = "TRWAGMYFPDXBNJZSQVHLCKE";

    if (validDNIPrefixes.includes(firstLetter)) {
      const numberPart = value.slice(0, -1);
      const index = parseInt(numberPart) % 23;
      const expectedLetter = validLetters.charAt(index);

      return letter === expectedLetter;
    }

    if (validNIEPrefixes.includes(firstLetter)) {
      const numberPart = value.slice(1, -1);
      const NIENumber = validNIEPrefixes.indexOf(firstLetter) + numberPart;
      const index = parseInt(NIENumber) % 23;
      const expectedLetter = validLetters.charAt(index);

      return letter === expectedLetter;
    }

    return false;
  }, { message: "Formato DNI/NIE incorrecto" });

const passRegex = /^(?=[a-zA-Z0-9]{8,30}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d]).*/;

export const UserRegisterSchema = z
  .object({
    dni: DNISchema,
    email: z
      .string()
      .min(1, { message: "Este campo es obligatorio" })
      .email("Debe ser un correo válido"),
    name: z
      .string()
      .min(1, { message: "Este campo es obligatorio" }),
    specialization: z
      .string()
      .min(1, { message: "Este campo es obligatorio" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener mínimo 8 caracteres" })
      .max(30,{message:"La contraseña debe tener máximo 30 caracteres"})
      .regex(new RegExp(passRegex), {
        message:
          "La contraseña debe contener solo letras y números, entre 8 y 30 caracteres, un número, una mayúscula y una minúscula",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Este campo es obligatorio" }),
    accept: z
      .boolean()
      .refine(value => value === true, { message: "Es necesario aceptar los términos legales" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas deben ser iguales",
  });
