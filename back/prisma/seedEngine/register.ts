import { registerResources } from './register/resources'
import { registerTopics } from './register/topics'
import { registerUsers } from './register/users'
import { Data } from './types'

/**
 * Registers a data object specification to the database
 * IMPORTANT: It is essential that the order of registration respects FK dependencies. For example, if Resource
 * has a FK to User and another to Topic, then registerUsers and registerTopics must be called before.
 * @param data 
 */
export const register = async (data: Data) => {
  await registerUsers(data)
  await registerTopics(data)
  await registerResources(data)
}
