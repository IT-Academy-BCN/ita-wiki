export const urls = {
  register: '/api/v1/auth/register',
  logIn: '/api/v1/auth/login',
  createResource: '/api/v1/resources/create',
  getMe: '/api/v1/auth/me',
  getTopics: '/api/v1/topics',
  getCategories: '/api/v1/categories',
  getResources: '/api/v1/resources',
  getTypes: '/api/v1/types',
  vote: '/api/v1/resources/vote/:resourceId/:vote',
  getFavorites: '/api/v1/favorites/by-user/:userId',
  getResourcesByUser: '/api/v1/resources/me',
}
