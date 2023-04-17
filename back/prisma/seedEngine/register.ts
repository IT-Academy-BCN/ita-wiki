import { registerResources } from './register/resources'
import { registerTopics } from './register/topics'
import { registerUsers } from './register/users'
import { Data } from './types'

/**
 * Registers a data specification object to the database
 * IMPORTANT: The order of registration needs to respects FK dependencies. For example, if Resource has a FK to User 
 * and another one to Topic, then registerUsers and registerTopics must be called before.
 * @param data 
 */
export const register = async (data: Data) => {
  await registerUsers(data)
  await registerTopics(data)
  await registerResources(data)
}
