# Changelog

All notable changes to this project will be documented in this file.

## [0.9.5] - 2024-01-20

### Fixed

- Fix error when passing props in styled componente to render in DOM.
```Styled Component
  const MyComponent = styled(FlexBox).withConfig<Type>({
  shouldForwardProp: (prop) => !['props'].includes(prop),
})`

## [0.9.0] - 2024-01-16

### Added

- Migrate Radio component to UI

## [0.8.0] - 2024-01-16

### Added

- Migrate Modal, Title, Text to UI

## [0.7.1] - 2024-01-16

### Chore

- Fix nginx

## [0.7.0] - 2024-01-16

### Added

- Logo and theming

## [0.6.0] - 2024-01-11

### Added

- Migrate InputGroup and ValidationMessage to UI

## [0.5.1] - 2024-01-11

### Added

- Add rollup build

## [0.5.0] - 2024-01-09

### Added

- Migrate BackButton to UI
- Added molecules folder
- Migrate Icon to UI

## [0.4.0] - 2024-01-09

### Added

- Added HamburgerMenu component

## [0.3.0] - 2024-01-09

### Added

- Migrate checkbox to UI
- Added disabled mode

## [0.2.3] - 2024-01-09

### chore

- Add .npmignore file

## [0.2.2] - 2023-12-21

### Added

- Add button component

## [0.2.1] - 2023-12-19

### Fix

- npm prepublishOnly

## [0.2.0] - 2023-12-19

### Added

- Migrate input to UI
- Added stories to storybook
- Tests config, and tests to atoms ( input and label)
- SonarCloud config
