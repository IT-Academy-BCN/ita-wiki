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
export { getVote, putVote } from './vote/voteController'
export { getTopics } from './topicController'
export { getCategories } from './categoryController'
export { postMedia } from './media/postMediaController'
export { getFavoriteResources } from './resources/getFavoriteResources'
