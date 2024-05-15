import jwt, { JwtPayload } from 'jsonwebtoken'
import { appConfig } from '../config'

export type KeyType = 'auth' | 'refresh'
export const generateToken = (userId: string, keyType: KeyType) => {
  const key =
    keyType === 'auth' ? appConfig.authJwtKey : appConfig.refreshJwtKey
  const expiresIn =
    keyType === 'auth'
      ? appConfig.authJwtExpiration
      : appConfig.refreshJwtExpiration
  return jwt.sign({ id: userId }, key, { expiresIn })
}

export const verifyToken = (token: string, keyType: KeyType): JwtPayload => {
  const key =
    keyType === 'auth' ? appConfig.authJwtKey : appConfig.refreshJwtKey
  return jwt.verify(token, key) as JwtPayload
}

export const generateExpiredToken = (userId: string, keyType: KeyType) => {
  const key =
    keyType === 'auth' ? appConfig.authJwtKey : appConfig.refreshJwtKey
  const payload = {
    id: userId,
    exp: Math.floor(Date.now() / 1000) - 60 * 60,
  }
  return jwt.sign(payload, key)
}
