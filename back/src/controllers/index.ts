export { loginController } from './auth/loginController'
export { logoutController } from './auth/logoutController'
export { registerController } from './auth/registerController'
export { authMeController } from './auth/authMeController'
export { createResource } from './resources/createResourceController'
export { getResources } from './resources/getResourcesController'
export { getResourcesById } from './resources/getResourcesById'
export {
  getResourcesByTopicId,
  getResourcesByTopicSlug,
} from './resources/getResourcesByTopic'
export { getResourcesByUserId } from './resources/getResourcesByUserId'
export { getFavoriteResources } from './resources/getFavoriteResources'
export { getVote, putVote } from './vote/voteController'
export { getTopics } from './topics/get'
export { createTopic } from './topics/create'
export { patchTopic } from './topics/patch'
export { getCategories } from './categoryController'
export { postMedia } from './media/postMediaController'
export { getTypes } from './type/typeController'
export { getUsers } from './users/get'
export { patchUser } from './users/patch'

