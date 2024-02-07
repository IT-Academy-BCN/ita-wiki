# Changelog

All notable changes to this project will be documented in this file.

## [1.9.0] - 2024-02-07

### Added

- `GET /users/name` endpoint to fetch user names and IDs by `ids` query parameter.

### Changed

- Adjusted middleware sequence: errorMiddleware now initialized before koaBody to capture body parsing errors.
- Modification of the user table to include the name field.
- `POST /register` endpoint to now accept name as an additional parameter.
- Updated query parsing and middleware to decode URL, handle array parameters, and store parsed queries in ctx.state.query.
- Enhanced `POST /user` endpoint to return name

### Testing

- Added tests for `GET /users/name` information endpoint
- Updated test for `POST /user` and `POST /register` endpoints

### Documentation

- Enhanced OpenAPI documentation with details on the new get users name information endpoint

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
