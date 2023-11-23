import jwt from 'jsonwebtoken'
import { appConfig } from '../config'

export const generateToken = (
  userId: string,
  expiresIn: string | number | undefined
) => {
  return jwt.sign({ id: userId }, appConfig.jwtKey, { expiresIn })
}

export const verifyToken = (token: string): boolean => {
  try {
    jwt.verify(token, appConfig.jwtKey)
    return true
  } catch (e) {
    return false
  }
}
