# Changelog

All notable changes to this project will be documented in this file.

## [0.7.0] - 2024-01-17

### Changed

- User-role associations now handled by SSO.

### Removed

- role from "users" table

### Testing

-  Updated ssoServer mock, get user handler now sends user role.

## [0.6.1] - 2024-01-11

### Fixed

- `userId` in user validation schema now accepts `cuid2` format.


### Testing

-  Verified `userId` fields now correctly accept `cuid2` format.

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
