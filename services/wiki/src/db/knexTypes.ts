/**
 * Model User
 *
 */
export type User = {
  id: string
  created_at: Date
  updated_at: Date
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
  resource_type: KnexResource
  user_id: string
  category_id: string
  created_at: Date
  updated_at: Date
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
  category_id: string
  created_at: Date
  updated_at: Date
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
  user_id: string
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
  user_id: string
  resource_id: string
  vote: number
  created_at: Date
  updated_at: Date
}

/**
 * Enums
 */

export enum KnexResource {
  BLOG = 'BLOG',
  VIDEO = 'VIDEO',
  TUTORIAL = 'TUTORIAL',
}
export type KRESOURCE = (typeof KnexResource)[keyof typeof KnexResource]

export type TResponse = {
  status: number
  generated_text: string
}

export enum TSupportedLanguage {
  English = 'en',
  Spanish = 'es',
  Catalan = 'ca',
}
