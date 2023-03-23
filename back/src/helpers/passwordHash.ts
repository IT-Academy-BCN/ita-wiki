import bcrypt from "bcrypt"
import { bcryptConfig } from "../config/config";

export const hashPassword = async (password : string) => {
    return await bcrypt.hash(password, bcryptConfig.saltRounds)
}

export const checkPassword = async (password : string, hashedPassword : string) => {
    return await bcrypt.compare(password, hashedPassword)
}