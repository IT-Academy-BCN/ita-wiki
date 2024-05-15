All notable changes to this project will be documented in this file.

# Changelog

## [1.27.1] - 2024-05-15

### Fixed

- Exclude DELETED Users from Responses for Non-DELETED Status Filters

## [1.27.0] - 2024-05-15

### Added

- Search option `DELETED` as status in the `queryBuilder` util.

## [1.26.0] - 2024-05-13

### Added

- Endpoint `DELETE /dashboard/users/` for a `batchDelete` for admin users.

## [1.25.0] - 2024-05-8

### Added

- Add `deletedAt` field to GET `dashboard/users` response body.

## [1.24.0] - 2024-04-30

### Added

- `queryBuilder` function created in `utils` to help the `dashboard/users/list` controller.

## [1.23.1] - 2024-04-23

### Changed

- Refactor `auth/login`, `users/getMe` and `users/list` controllers query to filter soft deleted users.

## [1.23.0] - 2024-04-22

### Changed

- role value added to the GET `dashboard/users` enpoint response.

## [1.22.0] - 2024-04-18

### Added

- POST `dashboard/users/status` endpoint.

## [1.21.0] - 2024-04-18

### Changed

- dni value added to the GET `dashboard/users` enpoint response.

## [1.20.0] - 2024-04-17

### Added

- PATCH `dashboard/users/userId` endpoint.

## [1.19.0] - 2024-04-15

### Added

- Endpoint `DELETE /dashboard/users/:id` for admin users.
- DB: `deleted_at` timestamp column to users talbe for soft delete

## [1.18.0] - 2024-04-11

### Changed

- Changed the response code for unauthorized access attempts from 498 to 401 to align with standard HTTP status codes.

## [1.17.0] - 2024-04-09

### Added

- GET `dashboard/users/me` endpoint.

## [1.16.2] - 2024-04-08

### Changed

- `authenticate` middleware refactored in one function.

## [1.16.1] - 2024-03-20

### Changed

- User status `Inactive` renamed to `Pending`.

## [1.16.0] - 2024-03-12

### Added

- User `Blocked` status functionality

## [1.15.1] - 2024-03-07

### Fixed

- Corrected DNI/NIE control letter validation in validation schemas to ensure data integrity.

## [1.15.0] - 2024-03-05

### Added

- Name search filter for `GET /dashboard/users` endpoint allowing partial and case-insensitive name matching.

### Changed

- Enhanced `startDate` and `endDate` query parameters documentation in OpenAPI to specify YYYY-MM-DD format.
- `userNameSchema` validation in `dashboardUsersListQuerySchema` to require a minimum of 2 characters for name searches.

## [1.14.1] - 2024-02-28

### Fix

- Package.json `npm run up` script

### Changed

- Updated README.md

## [1.14.0] - 2024-02-28

### Added

- Date range filtering by `createdAt` for `GET /dashboard/users`

## [1.13.0] - 2024-02-20

### Added

- Dynamic query filtering for `GET /dashboard/users` by `status`

### Changed

- `createdAt` at `dashboardUsersListSchema` to `z.date()`

## [1.12.0] - 2024-02-19

### Added

- Dynamic query filtering for `GET /dashboard/users` by `itinerarySlug`

## [1.11.0] - 2024-02-15

### Added

- Endpoint `GET /dashboard/users` for admin users.

## [1.10.0] - 2024-02-13

### Added

- Endpoint `POST /dashboard/login` and ` POST /dashboard/logout` for admin users.

## [1.9.0] - 2024-02-12

### Added

- Endpoint `/users` to fetch user `id` and `name` by passing an array of IDs in a query string.

### Changed

- Refined the `validate` and `parse` middleware functions to enhance query string handling
- Updated API endpoint naming to align with [Google Cloud API Design Standards](https://cloud.google.com/apis/design/standard_methods?hl=es-419):
  - Renamed `GET /user` to `GET /users/me` to better reflect the action of fetching the current user's information.
  - Changed `itinerary` endpoint to `itineraries` to use plural nouns for resources
  - Changed `token` endpoint to `tokens`
- Modified the user update endpoint from `PATCH /users` (with ID in the request body) to `PATCH /users/{id}`, specifying the user ID in the URL path.
- Adjusted middleware sequence: errorMiddleware now initialized before koaBody to capture body parsing errors.
- Modification of the user table to include the name field.
- `POST /register` endpoint to now accept name as an additional parameter.
- Updated query parsing and middleware to decode URL, handle array parameters, and store parsed queries in ctx.state.query.
- Enhanced `POST /users/me` endpoint to return name

### Fixed

- Enhanced error handling in `updateUser` controller: Now returns a `404 Not Found` status with the message "User not found" if the specified user ID does not match any existing user.

### Testing

- Added tests for `GET /users` information endpoint
- Updated test for `POST /users/me` , `PATCH /users/{id}` and `POST /register` endpoints

### Documentation

- Enhanced OpenAPI documentation with details on the new `GET /users` information endpoint

## [1.8.0] - 2024-01-24

### Changed

- Modification of the user table to include the status field with the USER_STATUS type.
- Added the role field with default values 'ACTIVE' and 'INACTIVE' to reflect the different user states in the system.
- Enhanced `loginController` to throw a 403 error if the user's status is 'INACTIVE'.

### Testing

- Implemented test to verify it returns a 403 status code when the user's status is 'INACTIVE'.
- Updated patch user test

### Documentation

- Added forbidden response for POST login user.

## [1.7.1] - 2024-01-24

### Chore

- remove unused deps (koa-ejs)

## [1.7.0] - 2024-01-18

### Added

- checkRole function
- authorization middleware
- Patch user information endpoint

### Changed

- Use of `ctx.state.user` instead of `ctx.id`
- authenticate middleware pass role information
-

### Documentation

- Enhanced OpenAPI documentation with details on the new patch user endpoint

### Testing

- Added tests for patch user information endpoint

## [1.6.0] - 2024-01-17

### Changed

- Modification of the user table to include the role field with the USER_ROLE type.
- Added the role field with default values 'ADMIN', 'REGISTERED', and 'MENTOR' to reflect the different user roles in the system.
- Enhanced the getUserController to retrieve the role attribute of users

### Testing

- Introduced tests to ensure DNI handling in registration and login processes accepts both uppercase and lowercase inputs.

## [1.5.1] - 2024-01-10

### Fixed

- Corrected DNI letter handling to ensure it's always stored and verified in uppercase.

### Testing

- Updated test for GET user.
- Updated the setup function to read SQL commands from `init.sql`

## [1.5.0] - 2023-12-20

### Added

- authenticate middleware
- Get user information endpoint

### Changed

- Modified validate token route to use authenticate middleware
- Updated controller logic to be handled in the authenticate middleware
-

### Testing

- Added tests for get user information endpoint

### Documentation

- Enhanced OpenAPI documentation with details on the new get user information endpoint

## [1.4.0] - 2023-12-14

### Changed

- Register, Validate, Login endpoint returns user id
- InvalidParamError to catch foreign_key error
- EmailError to EmailDniError

### Added

- DuplicateError to catch unique_key error in errorMiddleware

### Testing

- Added tests for GET itinerary.
- Updated test for POST register.

### Documentation

- Updated Login and Validate endpoints
- Added duplicateError response and register response for POST register user.

## [1.3.0] - 2023-11-23

### Added

- 'itinerary' table and update 'user' table schema
- itineraryId to userSchema and registerController
- InvalidParamError to catch foreign_key error

### Testing

- Added tests for GET itinerary.
- Updated test for POST register.

### Documentation

- Swagger endpoint for GET itinerary.
- Updated error response for POST register user.

## [1.2.0] - 2023-11-22

### Changed

- Updated "users" table to "user"

### Testing

- Added tests for POST validate token.

### Documentation

- Swagger endpoint for POST validate token.
- Updated description for POST login user.

## [1.1.1] - 2023-11-20

### Added

- Swagger endpoint for POST register user.

### Fixed

- Register endpoint schema, route, controller and test.

## [1.1.0] - 2023-11-14

### Added

- Initial beta release of the project.
