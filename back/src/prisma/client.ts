import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../helpers/passwordHash'

const prisma = new PrismaClient({
  //   log: ['query', 'info', 'warn'],
})

prisma.$use(async (params, next) => {
  if (params.model === 'User') {
    if (params.action === 'create' || params.action === 'upsert') {
      // eslint-disable-next-line no-param-reassign
      params.args.data.password = await hashPassword(params.args.data.password)
    } else if (params.action === 'update') {
      if (params.args.data.password) {
        // eslint-disable-next-line no-param-reassign
        params.args.data.password = await hashPassword(
          params.args.data.password
        )
      }
    } else if (params.action === 'createMany') {
      // eslint-disable-next-line no-param-reassign, no-restricted-syntax
      for (const user of params.args.data) {
        user.password = await hashPassword(user.password)
      }
    }
  }
  return next(params)
})

export { prisma }
