/**
 * Model User
 *
 */
export type User = {
  id: string
  createdAt: Date
  updatedAt: Date
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
  resourceType: RESOURCE
  userId: string
  categoryId: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Category
 *
 */
export type Category = {
  id: string
  name: string
  slug: string
  createdAt: Date
  updatedAt: Date
  mediaId: string | null
}

/**
 * Model Topic
 *
 */
export type Topic = {
  id: string
  name: string
  slug: string
  categoryId: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Media
 *
 */
export type Media = {
  id: string
  mimeType: string
  filePath: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model TopicsOnResources
 *
 */
export type TopicsOnResources = {
  resourceId: string
  topicId: string
  createdAt: Date
}

/**
 * Model Favorites
 *
 */
export type Favorites = {
  userId: string
  resourceId: string
  createdAt: Date
}

/**
 * Model ViewedResource
 *
 */
export type ViewedResource = {
  userId: string
  resourceId: string
}

/**
 * Model Vote
 *
 */
export type Vote = {
  userId: string
  resourceId: string
  vote: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
export const RESOURCE_TYPE: {
  BLOG: 'BLOG'
  VIDEO: 'VIDEO'
  TUTORIAL: 'TUTORIAL'
}

export type RESOURCE = (typeof RESOURCE_TYPE)[keyof typeof RESOURCE_TYPE]
