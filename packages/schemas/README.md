# ITA Wiki Schemas

Package to share Zod schemas between back and fron in the open source project ITA Wiki from ITAcademy - Barcelona Activa.

## This packages follows strict SEMVER

This packages follows strict semver: https://semver.org/

## Steps to add a new schema

1. Go to packages/schemas
2. Add new schema on a separate file, or fix an existing schema.
3. Export it from from the index.ts if it is not exported yet.
4. Run npm version patch, minor, or major according to SEMVER and your changes.
5. Create a PR.
6. When merged it will be published on npm.
7. Go back to your project (front or back).
8. update @itacademy/schemas package to the version you created.
9. Use the new schemas.


## Steps to use in development

1. While developing you can use relative imports to your schemas.
