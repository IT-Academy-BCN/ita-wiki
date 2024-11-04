import slugify from 'slugify'
import cuid from 'cuid'

export const mockCategory = {
  id: cuid(),
  name: 'Debugging',
  slug: slugify('Debugging', { lower: true }),
  created_at: new Date(),
  updated_at: new Date(),
}
export const newMockCategory = {
  id: cuid(),
  name: 'Testing Categories',
  slug: slugify('Testing Categories', { lower: true }),
  created_at: new Date(),
  updated_at: new Date(),
}
