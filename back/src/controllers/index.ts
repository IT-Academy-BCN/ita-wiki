export { loginController } from './auth/loginController'
export { logoutController } from './auth/logoutController'
export { registerController } from './auth/register'
export { authMeController } from './auth/authMeController'
export { createResource } from './resources/createResourceController'
export { getResources } from './resources/get'
export { getResourcesById } from './resources/getResourcesById'
export {
  getResourcesByTopicId,
  getResourcesByTopicSlug,
} from './resources/getResourcesByTopic'
export { getResourcesByUserId } from './resources/getResourcesByUserId'
export { getFavoriteResources } from './resources/getFavoriteResources'
export { getVote } from './vote/get'
export { putVote } from './vote/put'
export { getTopics } from './topics/get'
export { createTopic } from './topics/create'
export { patchTopic } from './topics/patch'
export { getCategories } from './categories/get'
export { createCategory } from './categories/create'
export { patchCategory } from './categories/patch'
export { postMedia } from './media/postMediaController'
export { getTypes } from './type/typeController'
export { getUsers } from './users/get'
export { patchUser } from './users/patch'
export { patchResource } from './resources/patchResource'
export { putFavoriteByUserId } from './favorites/putFavoriteByUserId'
export { createSeenResource } from './seen/create'
