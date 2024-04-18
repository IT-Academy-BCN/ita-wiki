export type TUserData = {
  id: string
  name: string
  dni: string
  status: string
  createdAt: string
  itineraryName: string
}

export type TItinerary = {
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
  role?: string
  status?: string
  deletedAt?: string
  itineraryId?: string
}
