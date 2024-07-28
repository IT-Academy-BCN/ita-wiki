import { User, UserPatch } from '../../schemas'
import { ItinerayList } from '../../schemas/itineraries/itinerariesListSchema'
import { client } from '../client'
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
export type GetUserOptions<T extends keyof User> = {
  fields: T[]
}
export async function fetchUser<T extends keyof User>(
  field: 'id' | 'dni',
  value: string,
  options: GetUserOptions<T>
): Promise<Pick<User, T> | null> {
  const snakeCase = await getSnakeCase()
  const camelCase = await getCamelCase()
  const fieldsToSelect = options.fields.map((f) => snakeCase(f)) as Array<
    keyof User
  >

  const result = await db<User>('user')
    .select(fieldsToSelect as string[])
    .where({ [snakeCase(field)]: value })
    .andWhere('deleted_at', null)
    .first<User | undefined>()

  if (result) {
    const camelCaseResult = Object.keys(result).reduce((acc, key) => {
      const typedKey = key as keyof User
      const camelKey = camelCase(key) as T
      acc[camelKey] = result[typedKey] as Pick<User, T>[T]
      return acc
    }, {} as Pick<User, T>)
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
   * @returns {Promise<Pick<User, T> | null>} A promise that resolves to a `Pick` of the `User`
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
  async getUser<T extends keyof User>(
    id: string,
    options: GetUserOptions<T>
  ): Promise<Pick<User, T> | null> {
    const snakeCase = await getSnakeCase()
    const camelCase = await getCamelCase()
    const fieldsToSelect = options.fields.map((f) => snakeCase(f)).join(', ')
    const query = `SELECT ${fieldsToSelect} FROM "user" WHERE id = $1 AND deleted_at IS NULL`
    const values = [id]
    const result = await client.query(query, values)

    if (result.rows.length) {
      const row = result.rows[0]
      const camelCaseRow = Object.keys(row).reduce((acc: any, key) => {
        acc[camelCase(key)] = row[key]
        return acc
      }, {} as Pick<User, T>)
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
   * @returns {Promise<Pick<User, T> | null>} A promise that resolves to a `Pick` of the `User`
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
  async findById<T extends keyof User>(
    id: string,
    options: GetUserOptions<T>
  ): Promise<Pick<User, T> | null> {
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
   * @returns {Promise<Pick<User, T> | null>} A promise that resolves to a `Pick` of the `User`
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
  async findByDni<T extends keyof User>(
    dni: string,
    options: GetUserOptions<T>
  ): Promise<Pick<User, T> | null> {
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
   * @returns {Promise<Pick<User, T>[]>} A promise that resolves to an array of `Pick` of the `User`
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
  async getUsersByIds<T extends keyof User>(
    options: GetUserOptions<T>,
    activeOnly: boolean = false,
    ids?: string[]
  ): Promise<Pick<User, T>[]> {
    const snakeCase = await getSnakeCase()
    const camelCase = await getCamelCase()
    const fieldsToSelect = options.fields.map((f) => snakeCase(f)).join(', ')
    let query = `SELECT ${fieldsToSelect} FROM "user" WHERE deleted_at IS NULL`
    const values: string[] = []

    if (activeOnly) {
      query += ` AND status = $1`
      values.push('ACTIVE')
    }

    if (ids && ids.length > 0) {
      const idsPlaceholders = ids
        .map((_, index) => `$${values.length + index + 1}`)
        .join(', ')
      query += ` AND id IN (${idsPlaceholders})`
      values.push(...ids)
    }

    const result = await client.query(query, values)

    if (result.rows.length) {
      return result.rows.map((row) => {
        const camelCaseRow = Object.keys(row).reduce((acc: any, key) => {
          acc[camelCase(key)] = row[key]
          return acc
        }, {} as Pick<User, T>)
        return camelCaseRow
      })
    }
    return []
  },
  async getAllItineraries(): Promise<ItinerayList[]> {
    const data = await db('itinerary').select('*')
    return data
  },
  async updateUserByIds<T extends UserPatch>(
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
}
