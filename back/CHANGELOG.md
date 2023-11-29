# Changelog

All notable changes to this project will be documented in this file.

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
