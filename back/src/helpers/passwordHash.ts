import bcrypt from 'bcrypt'
import { bcryptConfig } from '../config/config'

export const hashPassword = async (password: string) => await bcrypt.hash(password, bcryptConfig.saltRounds)

export const checkPassword = async (
  password: string,
  hashedPassword: string
) => await bcrypt.compare(password, hashedPassword)
