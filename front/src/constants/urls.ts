export const urls: Record<string, string> = {
  // auth
  register: '/api/v1/auth/register',
  getMe: '/api/v1/auth/me',

  // categories
  getCategories: '/api/v1/categories',

  // resources
  vote: '/api/v1/resources/vote/:resourceId/:vote',
}
