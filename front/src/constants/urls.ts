export const urls: Record<string, string> = {
  register: '/api/v1/auth/register',
  logIn: '/api/v1/auth/login',
  createResource: '/api/v1/resources/create',
  getMe: '/api/v1/auth/me',
  getTopics: '/api/v1/topics',
  getCategories: '/api/v1/categories',
  getResources: '/api/v1/resources',
  getTopics: '/api/v1/topics',
  vote: '/api/v1/resources/vote/:resourceId/:vote',
  getResourcesByUser: '/api/v1/resources/me',
}
