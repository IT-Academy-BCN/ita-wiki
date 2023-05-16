export { loginController } from './auth/loginController'
export { registerController } from './auth/registerController'
export { authMeController } from './auth/authMeController'
export { createResource } from './resources/createResourceController'
export { getResources } from './resources/getResourcesController'
export {
  getResourcesByTopicId,
  getResourcesByTopicSlug,
} from './resources/getResourcesByTopic'
export { getResourcesByUserId } from './resources/getResourcesByUserId'
export { getResourceVote, putResourceVote } from './resources/voteController'
export { getTopics, getTopicsByCategoryId } from './topicController'
export { getCategories } from './categoryController'
