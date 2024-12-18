/**
 * Model User
 *
 */
export type User = {
  id: string
  created_at: Date
  updated_at: Date
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Model Resource
 *
 */
export type Resource = {
  id: string
  title: string
  slug: string
  description: string | null
  url: string
  resource_type?: TRESOURCE
  resourceType?: TRESOURCE
  user_id?: string
  userId?: string
  category_id?: string
  categoryId?: string
  created_at?: Date
  updated_at?: Date
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Model Category
 *
 */
export type Category = {
  id: string
  name: string
  slug: string
  created_at: Date
  updated_at: Date
  media_id: string | null
}

/**
 * Model Topic
 *
 */
export type Topic = {
  id: string
  name: string
  slug: string
  categoryId?: string
  category_id?: string
  createdAt?: Date
  createdAt?: Date
  updated_at?: Date
  updated_at?: Date
}

/**
 * Model Media
 *
 */
export type Media = {
  id: string
  mimeType: string
  filePath: string
  user_id: string
  created_at: Date
  updated_at: Date
}

/**
 * Model TopicsOnResources
 *
 */
export type TopicsOnResources = {
  resource_id: string
  topic_id: string
  created_at: Date
}

/**
 * Model Favorites
 *
 */
export type Favorites = {
  user_id?: string
  userId?: string
  resource_id: string
  created_at: Date
}

/**
 * Model ViewedResource
 *
 */
export type ViewedResource = {
  user_id: string
  resource_id: string
}

/**
 * Model Vote
 *
 */
export type Vote = {
  user_id?: string
  userId?: string
  resource_id: string
  vote: number
  created_at: Date
  updated_at: Date
}

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
export type TRESOURCE = {
  BLOG: 'BLOG'
  VIDEO: 'VIDEO'
  TUTORIAL: 'TUTORIAL'
}

// export type RESOURCE = (typeof RESOURCE_TYPE)[keyof typeof RESOURCE_TYPE]
