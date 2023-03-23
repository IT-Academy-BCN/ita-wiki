import { PrismaClient } from '@prisma/client'
import { hashPassword, checkPassword } from '../helpers/passwordHash'

const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
  if (params.model === 'User' && params.args.data.password != null) {
    // Hash password on create or update
    if (
      params.action === 'create' ||
      params.action === 'update' ||
      params.action === 'upsert' ||
      params.action === 'createMany'
    ) {
      params.args.data.password = await hashPassword(params.args.data.password)
    }

    // Check if password matches on find
    else if (params.action === 'findUnique') {
      const { password } = params.args.data
      const result = await next(params)
      result.passwordMatches = await checkPassword(password, result.password)
      return result
    }
  }
  return next(params)
})
