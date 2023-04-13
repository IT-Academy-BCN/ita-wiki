"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginSchema = void 0;
const zod_1 = require("zod");
const validNIEPrefixes = ["X", "Y", "Z"];
const validDNIPrefixes = [...Array(23).keys()].map((i) => (i + 1).toString());
const DNI_REGEX = /^(([XYZ]\d{7,8})|(\d{8}))([a-zA-Z])$/i;
const DNISchema = zod_1.z
    .string()
    .regex(DNI_REGEX)
    .transform((value) => value.toUpperCase())
    .refine((value) => {
    const firstLetter = value.charAt(0);
    return (validDNIPrefixes.includes(firstLetter) ||
        validNIEPrefixes.includes(firstLetter));
});
exports.UserLoginSchema = zod_1.z.object({
    dni: DNISchema,
    password: zod_1.z.string().min(8),
});
