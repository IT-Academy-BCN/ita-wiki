import { AnyZodObject } from "zod"

export const validateMany = (collection : any[], schema : AnyZodObject) => {
    collection.forEach((element) => schema.parse(element))
}

