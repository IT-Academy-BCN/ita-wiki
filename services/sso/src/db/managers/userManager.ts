import { User } from '../../schemas'
import { client } from '../client'

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
}
