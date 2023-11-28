# Changelog

All notable changes to this project will be documented in this file.

## [0.6.2] - 2023-11-28

### Fixed

- Width and height of resources aside in Category page

## [0.6.1] - 2023-11-28

### Fixed

- Logo and categories

## [0.6.0] - 2023-11-27

### Added

- Implemented search by name query and filters
- Created Search component

### Update

- Updated Navbar to allow search on mobile devices according Figma design
- Updated tests

## [0.5.4] - 2023-11-28

### Fixed

- Implemented multilingual corrections.
- Added necessary translations, including updates to `AccessModalContent`.
- Updated tests accordingly.

## [0.5.3] - 2023-11-27

### Fixed

- Fix patch to update user status
- Convert fetch to mutation and create a hook
- Fix file name spelling to AccountAdmin
- Update tests accordingly

## [0.5.2] - 2023-11-27

### Update

- Updated the category icons in the side menu

## [0.5.1] - 2023-11-24

### Fixed

- Disabled VotesDateController when no resources are available.
- Translated error message for Category page details without resources.
- Updated tests according to new changes.

## [0.5.0] - 2023-11-23

### Added

- New resource search bar UI implementation

## [0.4.4] - 2023-11-23

### Fixed

- Adjusted the general styles of the AdminAccount table.
- Updated translations accordingly.
- Relocated AccountAdmin.test from the "pages" directory to "/components/organisms".

## [0.4.3] - 2023-11-23

### Fixed

- Fix register error message.

## [0.4.2] - 2023-11-22

### Fixed

- User Profile bug when user has no resources.

## [0.4.1] - 2023-11-21

### Fixed

- Updated border-radius to use fixed values from dimensions.

## [0.4.0] - 2023-11-21

### Changed

- Updated api url to itawiki

### Added

- Laravel logo to Categories list
- Category name to Category page (translation and test)

## [0.3.0] - 2023-11-20

### Added

- Resources and favorites widgets to User Profile

### Changed

- User Profile UI
- SortOrder type to avoid repetitions

### Fixed

- My Resources widget in Category page

## [0.2.1] - 2023-11-16

### Changed

- Refactored votes/dates logic into a single component (VotesDateController).

### Fixed

- Fixed 'Votos' & 'Fecha' visual inconsistencies (arrow icon asc/desc, initial state).
- Incorporated missing translations.

## [0.1.1] - 2023-11-15

### Fixed

- Various bug fixes in tests.

## [0.1.0] - 2023-11-14

### Added

- Initial beta release of the project.
