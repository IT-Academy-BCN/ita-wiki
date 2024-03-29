# Changelog

All notable changes to this project will be documented in this file.

## [0.12.0] - 2024-03-19

### Changed

- Endpoint `GET /resources/topic/{topicId}` removed. Consolidated in GET/resources/list

## [0.11.0] - 2024-03-18

### Removed

- Endpoint `GET /resources/topic/slug/{slug}` removed. Use `topicSlug` query parameter on `GET /resources` for topic-based filtering.

### Changed

- Query parameter `slug` in `GET /resources` renamed to `categorySlug` for clarity in category filtering.
- Renamed `resources` controller method from `get` to `list` to better reflect the action of listing resources.

### Added

- Support for `topicSlug` query parameter in `GET /resources` for enhanced topic-specific resource filtering.

## [0.10.2] - 2024-03-13

### Fixed

- Handle Missing User Names without Throwing ServiceFail

## [0.10.1] - 2024-03-11

### Fixed

- Retrieve resources with user empty name

## [0.10.0] - 2024-02-12

### Added

- `attachUserNamesToResources` to unify and simplify resource object structure across the application by ensuring all resources include `user` details (name and optionally `avatarId`) and `favorites` -`markFavorites` to mark resources as favorites based on user interaction,
- Get users name by id from SSO endpoint

### Changed

- Endpoint naming conventions in SSOhandler have been updated to align with the latest changes in the SSO. This update affects several endpoints and query string handling. For a complete list of endpoint naming changes and their implications, please refer to the [SSO changelog](../sso/CHANGELOG.md#190---2024-02-07).
- Removed unnecessary nesting in the Prisma query within the `getFavoriteResources` middleware.
- Adjusted middleware sequence: errorMiddleware now initialized before koaBody to capture body parsing errors.
- User name is now handled by SSO.

### Removed

- name from "users" table

### Testing

- Organized MSW handlers into separate files
- Added to ssoServer mock, get users name by id handler.

### Documentation

- Added `UpstreamServiceFail` response

## [0.9.0] - 2024-01-24

### Changed

- User-status associations now handled by SSO.

### Removed

- status from "users" table

### Testing

- Modified `ssoServer` mock: login handler now issues a 403 error for inactive user logins.

### Documentation

- Added forbidden response for POST login user.

## [0.8.0] - 2024-01-23

### Added

- Patch user from SSO endpoint
- patch user schema

### Testing

- Updated user patch tests
- Added to ssoServer mock, patch user handler.

## [0.7.2] - 2024-01-18

### Testing

- Fixed user patch tests

## [0.7.1] - 2024-01-17

### Fixed

- Prisma migration renamed

## [0.7.0] - 2024-01-17

### Changed

- User-role associations now handled by SSO.

### Removed

- role from "users" table

### Testing

- Updated ssoServer mock, get user handler now sends user role.

## [0.6.1] - 2024-01-11

### Fixed

- `userId` in user validation schema now accepts `cuid2` format.

### Testing

- Verified `userId` fields now correctly accept `cuid2` format.

## [0.6.0] - 2024-01-08

### Added

- Get itineraries from SSO endpoint

### Removed

- Specialization from "users" table

### Testing

- Added tests for GET itineraries endpoint

### Documentation

- Enhanced OpenAPI documentation with details on the new GET itineraries endpoint

## [0.5.0] - 2023-12-20

### Changed

- Retrieve DNI and email of the user from SSO instead of the database

### Testing

- Added to ssoServer mock, get user handler.

## [0.4.0] - 2023-12-14

### Added

- `ssoUrl` to `.env` file and `appConfig`
- implemented SSO in auth files and authenticate middleware file

### Removed

- password, dni and email from User model

### Testing

- Added ssoServer mock
- Updated tests to implement ssoServer mock
- Changed token cookies to authToken
- Changed create resource test to post

## [0.3.4] - 2023-11-29

### Changed

- Modified GET Favorites query so the nested user object returned with each favorite resource, specifies the name and avatarId of the author of each resource.

## [0.3.3] - 2023-11-28

### Changed

- Modified GET Favorites resources controller and schema so response omits userId and includes a "isAuthor" boolean and a user object contaning name and avatarId.

## [0.3.2] - 2023-11-23

### Changed

- Modified GET resources controller so search query param only is applied when it is 2 or more chars long.

## [0.3.1] - 2023-11-23

### Changed

- Modified GET resources endpoint to admit one optional topic string (topicId).

## [0.3.0] - 2023-11-21

### Changed

- Added search query param to get resources endpoint.

## [0.2.0] - 2023-11-20

### Changed

- Modify resources get controller to accept an array of topicIds.

## [0.1.0] - 2023-11-14

### Added

- Initial beta release of the project.
