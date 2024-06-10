# Changelog

All notable changes to this project will be documented in this file.

## [0.20.1] - 2024-06-06

###  Fixed

- Fixed missing resourceType error message
- Fixed error message translations

## [0.20.0] - 2024-05-28

### Removed

- Remove Banners from Home Page

## [0.19.0] - 2024-05-24

### Added

- Add Banners in Home Page

## [0.18.2] - 2024-05-21

### Fixed

- Fix logging behavior and improve error messages
- Fix style and warning in Register

## [0.18.1] - 2024-05-19

### Changed

- Change height of the description field of Resource Form

## [0.18.0] - 2024-04-01

### Changed

- Change Category page structure to separate styles

### Fixed

- Fix console warnings in SelectLanguage, Search and ResouceCardList
- Fix resources scroll in Category page
- Fix style details in Navbar and UserButton

### Added

- Add test to ResouceCardList

## [0.17.1] - 2024-03-20

### Changed

- Change query parameter `slug` to `categorySlug` in Category filters according to changed endpoint `GET/resources`

## [0.17.0] - 2024-03-19

### Added

- Added missing tests from CardResource component

## [0.16.0] - 2024-03-18

### Removed

- Import EditableItem from UI

## [0.15.0] - 2024-03-12

### Removed

- Import missing atoms and styles from UI
- Removed old atoms, styles and tests

## [0.14.0] - 2024-03-11

### Removed

- Import molecules from UI
- Removed old molecules and tests

## [0.13.1] - 2024-03-07

### Fixed

- Fixed SearchBar with InputGroup from UI

## [0.13.0] - 2024-03-04

### Removed

- Import CheckboxFilterWidget from UI

## [0.12.0] - 2024-02-07

### Removed

- Import Radio from UI

## [0.11.1] - 2024-02-07

### Fixed

- Remove unnecessary prop from NavBar

## [0.11.0] - 2024-02-06

### Added

- Import atoms ui components into front organisms

## [0.10.0] - 2024-02-01

### Removed

- Import Tabs from UI

## [0.9.1] - 2024-01-31

### Fix

- Bump msw to 2.1.5
- Fix tests

## [0.9.0] - 2024-01-31

### Removed

- Bump @itacademy/ui to 0.12.1
- Import Button from UI

## [0.8.0] - 2024-01-30

### Removed

- Remove unused Link component

## [0.7.1] - 2023-11-28

### Fixed

- Unique ID generation when linking label with HTMLelement

## [0.7.0] - 2023-12-11

### Added

- Added useGetItineraries hook and its test

### Changed

- Register dropdown shows itineraries
- Register request includes itineraryId instead of specialization
- Updated tests accordingly

### Fixed

- Fixed missing translation of error in legal terms at Register

## [0.6.9] - 2023-12-13

### Fixed

- Fixed "Todos" radio button not being selected when switching between categories.
- Updated tests.

## [0.6.8] - 2023-11-29

### Fixed

- Fixed topics list updating on create and update topics
- Update ManageTopics hook to update cache in mutations
- Changed modal close button style to outline

## [0.6.7] - 2023-11-29

### Fixed

- Filtered topics on edit resource by slug

## [0.6.6] - 2023-11-29

### Fixed

- Adapt UserProfileresourcesWidget to updated endpoint
- Fixed favorites type
- Updated tests accordingly

## [0.6.5] - 2023-11-29

### Fixed

- Fixed missing topic and ResourceType initial values from resource when editing
- TyesFiltersWidget inconsistency with resourceType name
- Edit resource topic bug.

## [0.6.4] - 2023-11-28

### Update

- Incorporated new hover effects.

### Fixed

- Implemented Catalan corrections (eg. use "preferits" instead of "favorits").
- Updated tests according to new changes.

## [0.6.3] - 2023-11-28

### Update

- Add favicon to browser tab and remove unused icons

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
