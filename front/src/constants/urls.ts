export const urls: Record<string, string> = {
  register: '/api/v1/auth/register',
  getMe: '/api/v1/auth/me',
  getCategories: '/api/v1/categories',
  vote: '/api/v1/resources/vote/:resourceId/:vote',
  getFavorites: '/api/v1/favorites/by-user/:userId',
}
