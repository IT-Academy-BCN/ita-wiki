export const urls: Record<string, string> = {
  register: '/api/v1/auth/register',
  getMe: '/api/v1/auth/me',
  getCategories: '/api/v1/categories',
  getTopics: '/api/v1/topics',
  vote: '/api/v1/resources/vote/:resourceId/:vote',
  getResourcesByUser: '/api/v1/resources/me',
  getResources:  '/api/v1/resources',
}
