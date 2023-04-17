# It Academy Project - Wiki

This project uses a set of technologies to facilitate the development of web applications and APIs. The goal of this README is to provide a guide for new project members to integrate more easily and start contributing as soon as possible.

## Getting Started

Before running the project, make sure you have Docker Desktop installed. Once you have Docker Desktop installed and running, follow the steps below:

1. cd into the front folder if you haven't already:

   `cd front`

2. Install the required dependencies:

   `npm i` if there are version incompatibilty between dependencies `npm i --legacy-peer-deps`

3. Start the project:

   `npm run dev`

## Scripts

Here are some of the useful scripts you can use:

- `"dev"`: start dev server.
- `"build"`: build for production.
- `"preview"`: locally preview production build.
- `"test"`: runs the tests using the `vitest` test runner.

### Golden Rules

1.  All code contributions must pass the CI/CD pipeline, which includes running linters, tests, and other checks. Please do not try to make pull requests that do not pass these validations.
2.  Code must follow the project's ESLint configuration. Make sure your editor is configured to use the project's `.eslintrc` file (It should be automatically detected by ESLint if you are using Visual Studio Code).
3.  All code contributions must have accompanying tests.

## Very Useful Documentation

Here are some useful links to official documentation for the technologies used in this project:

- [Atomic design methodology](https://atomicdesign.bradfrost.com/chapter-2/)
- [Typescript](https://www.typescriptlang.org/docs/handbook/react.html) - Typescript documentation.
- [vitest](https://vitest.dev/guide/) - vitest testing framework documentation.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - React Testing Library documentation.



