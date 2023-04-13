import { z } from "zod";
export declare const UserLoginSchema: z.ZodObject<{
    dni: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    dni: string;
    password: string;
}, {
    dni: string;
    password: string;
}>;
