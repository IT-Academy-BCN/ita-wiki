# It Academy Project - Wiki

This project uses a set of technologies to facilitate the development of web applications and APIs. The goal of this README is to provide a guide for new project members to integrate more easily and start contributing as soon as possible.

## Getting Started

Follow the steps below:

1. cd into the web/wiki folder if you haven't already:

   `cd web/wiki`

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
- `"codegen"`: generates fetchers, hooks and types from Swagger specifications using OpenAPI-codegen library

### Golden Rules

1.  All code contributions must pass the CI/CD pipeline, which includes running linters, tests, and other checks. Please do not try to make pull requests that do not pass these validations.
2.  Code must follow the project's ESLint configuration. Make sure your editor is configured to use the project's `.eslintrc` file (It should be automatically detected by ESLint if you are using Visual Studio Code).
3.  All code contributions must have accompanying tests.

### Use of context AuthProvider

AuthProvider gives us access to the user information in all our app. It tell us if the user is logged in and their details.

To use it, we call the custom hook useAuth:

```
const { user } = useAuth()
```

This user would be the next object:

```
   {
      id: 'mk0xwkx64yq4v9wmu01mx709',
      dni: '12345678A',
      email: 'user_email@email.com',
      name: 'Jane',
      role: 'REGISTERED'
   }
```

## Very Useful Documentation

Here are some useful links to official documentation for the technologies used in this project:

- [Atomic design methodology](https://atomicdesign.bradfrost.com/chapter-2/)
- [Typescript](https://www.typescriptlang.org/docs/handbook/react.html) - Typescript documentation.
- [vitest](https://vitest.dev/guide/) - Vitest testing framework documentation.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - React Testing Library documentation.
- [OpenAPI-Codegen](https://github.com/fabien0102/openapi-codegen)

For the students of IT Academy there is a course on YouTube that will teach you the why's behind the structure of the project and can be a good introduction to Atomic Design, testing, etc...: [Curso React Avanzado - YouTube](https://www.youtube.com/watch?v=0Fg_Rgcgvj0&list=PLr1rMfNwtgewBlEmzdqx88_i1ddKZA9n7&ab_channel=KevinMamaqiKapllani)
