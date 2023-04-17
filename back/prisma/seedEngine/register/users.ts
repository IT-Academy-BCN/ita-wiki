import { prisma } from '../../../src/prisma/client'
import { UserSchema } from '../../../src/schemas'
import { Data } from '../types'
import { validateMany } from '../validateMany'

/**
 * Validates user data against Zod schema, creates the users in the database and sets back the DAO objects to data.users so the IDs
 * can be recovered and be used to map FK
 * @param data 
 */
export const registerUsers = async (data: Data) => {
  const { users } = data

  validateMany(
    users,
    UserSchema.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
    })
  )

  // We don't use createMany because it only returns a count
  // Ref: https://github.com/prisma/prisma/issues/8131#issuecomment-1013481162
  // eslint-disable-next-line no-param-reassign
  data.users = await prisma.$transaction(
    users.map((user) => prisma.user.create({ data: user }))
  )
}
