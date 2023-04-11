import { prisma } from '../client'
import { hashPassword } from '../../helpers/passwordHash'

prisma.$use(async (params, next) => {
  if (params.model === 'User' && (
      params.action === 'create' ||
      params.action === 'update' ||
      params.action === 'upsert' ||
      params.action === 'createMany'
    )) {
      // eslint-disable-next-line no-param-reassign
      params.args.data.password = await hashPassword(params.args.data.password)
    }
  
  return next(params)
})
