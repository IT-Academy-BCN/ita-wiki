import { z } from 'zod';
export declare const UserRegisterSchema: z.ZodEffects<z.ZodObject<{
    dni: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
    email: z.ZodString;
    name: z.ZodString;
    itineraryId: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    accept: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
}, "strip", z.ZodTypeAny, {
    dni: string;
    password: string;
    email: string;
    name: string;
    itineraryId: string;
    confirmPassword: string;
    accept: boolean;
}, {
    dni: string;
    password: string;
    email: string;
    name: string;
    itineraryId: string;
    confirmPassword: string;
    accept: boolean;
}>, {
    dni: string;
    password: string;
    email: string;
    name: string;
    itineraryId: string;
    confirmPassword: string;
    accept: boolean;
}, {
    dni: string;
    password: string;
    email: string;
    name: string;
    itineraryId: string;
    confirmPassword: string;
    accept: boolean;
}>;
