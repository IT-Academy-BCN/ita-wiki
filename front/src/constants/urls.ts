export const urls: Record<string, string> = {
  register: '/api/v1/auth/register',
  getMe: '/api/v1/auth/me',
  getCategories: '/api/v1/categories',
  getTopicsByCategory: '/api/v1/topics?slug=:categorySlug',
  vote: '/api/v1/resources/vote/:resourceId/:vote',
}
