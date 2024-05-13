export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED',
}

export type TFilters = {
  itinerarySlug?: string
  status?: UserStatus
  startDate?: string
  endDate?: string
  name?: string
  dni?: string
  role?: string
}

export type TItinerary = {
  id: string
  name: string
  slug: string
}

export type TRole = {
  id: string
  name: string
  slug: string
}

export type TUpdatedUser = {
  id: string
  dni?: string
  email?: string
  name?: string
  password?: string
  status?: UserStatus
  role?: UserRole
  deletedAt?: string
  itineraryId?: string
}

export type TUserData = {
  id: string
  name: string
  dni: string
  status: string
  createdAt: string
  itineraryName: string
  role: string
  deletedAt?: string
}

export enum UserRole {
  ADMIN = 'ADMIN',
  REGISTERED = 'REGISTERED',
  MENTOR = 'MENTOR',
}
