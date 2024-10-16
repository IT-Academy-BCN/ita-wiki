import { TUser, TUserPatch } from '../../schemas'
import { TItinerayList } from '../../schemas/itineraries/itinerariesListSchema'
import db from '../knexClient'

/**
 * Dynamically loads the `change-case` module to access its `snakeCase` function, resolving
 * the compatibility issue of importing an ESM module into a CommonJS environment.
 *
 * @returns A promise that resolves with the `snakeCase` function from the dynamically imported module.
 */
async function getSnakeCase() {
  const { snakeCase } = await import('change-case')
  return snakeCase
}
async function getCamelCase() {
  const { camelCase } = await import('change-case')
  return camelCase
}
export type GetUserOptions<T extends keyof TUser> = {
  fields: T[]
}
export async function fetchUser<T extends keyof TUser>(
  field: 'id' | 'dni',
  value: string,
  options: GetUserOptions<T>
): Promise<Pick<TUser, T> | null> {
  const snakeCase = await getSnakeCase()
  const camelCase = await getCamelCase()
  const fieldsToSelect = options.fields.map((f) => snakeCase(f)) as Array<
    keyof TUser
  >

  const result = await db<TUser>('user')
    .select(fieldsToSelect as string[])
    .where({ [snakeCase(field)]: value })
    .andWhere('deleted_at', null)
    .first<TUser | undefined>()

  if (result) {
    const camelCaseResult = Object.keys(result).reduce((acc, key) => {
      const typedKey = key as keyof TUser
      const camelKey = camelCase(key) as T
      acc[camelKey] = result[typedKey] as Pick<TUser, T>[T]
      return acc
    }, {} as Pick<TUser, T>)
    return camelCaseResult
  }
  return null
}
export const userManager = {
  /**
   * Retrieves a user from the database based on the user ID and selected fields.
   * This function queries the database for a user by their ID and returns a dynamically
   * typed object based on the fields specified in the `fields` option.
   * The returned type is a `Pick` of the `User` type.
   *
   * @param {string} id - The unique identifier of the user to retrieve.
   * @param {GetUserOptions<T>} options - Configuration options that specify which fields
   *                                      of the `User` object should be returned. The `fields`
   *                                      array must contain one or more keys of the `User` type.
   * @returns {Promise<Pick<TUser, T> | null>} A promise that resolves to a `Pick` of the `User`
   *                                          type with only the requested fields, or null if
   *                                          the user is not found.
   *
   * Example usage:
   * ```typescript
   * getUser('123', { fields: ['id', 'email', 'status'] }).then(user => {
   *   if (user) {
   *     console.log(user.email); // Accessible
   *     console.log(user.id); // Accessible
   *   }
   * });
   * ```
   *
   * @throws {Error} Throws an error if the SQL query fails.
   */
  async getUser<T extends keyof TUser>(
    id: string,
    options: GetUserOptions<T>
  ): Promise<Pick<TUser, T> | null> {
    const snakeCase = await getSnakeCase()
    const camelCase = await getCamelCase()
    const fieldsToSelect = options.fields.map((f) => snakeCase(f))
    const values = [id]
    const result = await db('user')
      .select(fieldsToSelect)
      .whereIn('id', values)
      .andWhere('deleted_at', null)
    if (result.length) {
      const row = result[0]
      const camelCaseRow = Object.keys(row).reduce((acc: any, key) => {
        acc[camelCase(key)] = row[key]
        return acc
      }, {} as Pick<TUser, T>)
      return camelCaseRow
    }
    return null
  },
  /**
   * Retrieves a user from the database based on the user ID and selected fields.
   * This function queries the database for a user by their ID and returns a dynamically
   * typed object based on the fields specified in the `fields` option.
   * The returned type is a `Pick` of the `User` type.
   *
   * @param {string} id - The unique identifier of the user to retrieve.
   * @param {GetUserOptions<T>} options - Configuration options that specify which fields
   *                                      of the `User` object should be returned. The `fields`
   *                                      array must contain one or more keys of the `User` type.
   * @returns {Promise<Pick<TUser, T> | null>} A promise that resolves to a `Pick` of the `User`
   *                                          type with only the requested fields, or null if
   *                                          the user is not found.
   *
   * Example usage:
   * ```typescript
   * findById('123', { fields: ['id', 'email', 'status'] }).then(user => {
   *   if (user) {
   *     console.log(user.email); // Accessible
   *     console.log(user.id); // Accessible
   *   }
   * });
   * ```
   *
   * @throws {Error} Throws an error if the SQL query fails.
   */
  async findById<T extends keyof TUser>(
    id: string,
    options: GetUserOptions<T>
  ): Promise<Pick<TUser, T> | null> {
    return fetchUser('id', id, options)
  },

  /**
   * Retrieves a user from the database based on the user DNI and selected fields.
   * This function queries the database for a user by their DNI and returns a dynamically
   * typed object based on the fields specified in the `fields` option.
   * The returned type is a `Pick` of the `User` type.
   *
   * @param {string} dni - The unique identifier of the user to retrieve.
   * @param {GetUserOptions<T>} options - Configuration options that specify which fields
   *                                      of the `User` object should be returned. The `fields`
   *                                      array must contain one or more keys of the `User` type.
   * @returns {Promise<Pick<TUser, T> | null>} A promise that resolves to a `Pick` of the `User`
   *                                          type with only the requested fields, or null if
   *                                          the user is not found.
   *
   * Example usage:
   * ```typescript
   * findByDni('12345678A', { fields: ['id', 'email', 'status'] }).then(user => {
   *   if (user) {
   *     console.log(user.email); // Accessible
   *     console.log(user.id); // Accessible
   *   }
   * });
   * ```
   *
   * @throws {Error} Throws an error if the SQL query fails.
   */
  async findByDni<T extends keyof TUser>(
    dni: string,
    options: GetUserOptions<T>
  ): Promise<Pick<TUser, T> | null> {
    return fetchUser('dni', dni, options)
  },
  /**
   * Retrieves a list of users from the database based on selected fields and optional status.
   * This function queries the database for users and returns a dynamically typed array of objects
   * based on the fields specified in the `fields` option and the optional `status` filter.
   * The returned type is an array of `Pick` of the `User` type.
   *
   * @param {GetUserOptions<T>} options - Configuration options that specify which fields
   *                                      of the `User` object should be returned. The `fields`
   *                                      array must contain one or more keys of the `User` type.
   * @param {boolean} [activeOnly=false] - Optional parameter to filter users by active status.
   * @param {string[]} [ids] - Optional array of user IDs to filter the results. If not provided, all users will be returned.
   * @returns {Promise<Pick<TUser, T>[]>} A promise that resolves to an array of `Pick` of the `User`
   *                                     type with only the requested fields. Returns an empty array if no users are found.
   *
   * Example usage:
   * ```typescript
   * getUsers({ fields: ['id', 'email', 'status'] }, true).then(users => {
   *   users.forEach(user => {
   *     console.log(user.email); // Accessible
   *     console.log(user.id); // Accessible
   *   });
   * });
   * ```
   *
   * @throws {Error} Throws an error if the SQL query fails.
   */
  async getUsersByIds<T extends keyof TUser>(
    options: GetUserOptions<T>,
    activeOnly: boolean = false,
    ids?: string[]
  ): Promise<Pick<TUser, T>[]> {
    const snakeCase = await getSnakeCase()
    const camelCase = await getCamelCase()
    const fieldsToSelect = options.fields.map((f) => snakeCase(f))
    const query = db<TUser>('user')
      .select(fieldsToSelect)
      .where('deleted_at', null)
    if (activeOnly) {
      query.where('status', 'ACTIVE')
    }

    if (ids && ids.length > 0) {
      query.whereIn('id', ids)
    }
    const result = await query
    if (result.length) {
      const res: Pick<TUser, T>[] = result.map((row) => {
        const camelCaseRow = Object.entries(row).reduce(
          (acc: any, [key, value]) => {
            acc[camelCase(key)] = value
            return acc
          },
          {} as Pick<TUser, T>
        )
        return camelCaseRow
      })
      return res
    }
    return []
  },
  /**
   * Set a new values to a user from the database based on the user IDs and selected fields key/values.
   * This function queries the database for a user by their IDs and no retrieves nothing, just a void.
   * The parmater type is a `Partial` of the `UserPatch` type.
   * The returned type is a void.
   *
   * @param {string[]} ids - The unique identifier Array of the users to retrieve.
   * @param {TUserPatch} options - Configuration options that specify
   *                                      field to set and its values. The `options`
   *                                       must contain one or more keys/value of the `UserPatch` type to SET.
   * @returns {Promise<void>} A promise of void.
   *
   *
   * Example usage:
   * ```typescript
   * updateUserByIds({name: 'Joan', deletedAt: String(knex.fn.now])  }, ['bbiax2thm5usyfg7lus1sosp'])
   * ```
   *
   * @throws {Error} Throws an error if the SQL query fails.
   */
  async updateUserByIds<T extends TUserPatch>(
    options: T,
    ids: string[]
  ): Promise<void> {
    const snakeCase = await getSnakeCase()
    const keyObject = Object.keys(options)
    const valueObject = Object.values(options)
    const setArray = keyObject.map((key, index) => [
      snakeCase(key),
      valueObject[index],
    ])
    const setObject = Object.fromEntries(setArray)

    await db('user').update(setObject).whereIn('id', ids)
  },

  /**
   * Retrieve a list of all itineraries  from the database
   * Doesn't requiere any parameters
   * The returned type is a Array of ItineraryList type.
   *
   * @returns {Promise<ItinerayList[]>} A promise of list of itineraries
   *
   */

  async getAllItineraries(): Promise<TItinerayList[]> {
    const data = await db('itinerary').select('*')
    return data
  },
}
