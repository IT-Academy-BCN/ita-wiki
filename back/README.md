# It Academy Project - Wiki

This project uses a set of technologies to facilitate the development of web applications and APIs. The goal of this README is to provide a guide for new project members to integrate more easily and start contributing as soon as possible.

## Technologies

### TypeScript

The project uses TypeScript as its programming language. TypeScript is an extension of JavaScript that adds features such as static type checking, allowing developers to find and fix issues before they happen. Additionally, TypeScript offers better code organization, increased readability, and an overall better development experience. You can find the [official TypeScript documentation](https://www.typescriptlang.org/docs) here.

### Koa

Koa is a minimalist Node.js framework focused on building web applications and APIs. Compared to Express, Koa focuses on using middleware functions instead of cascading middleware layers, making the code easier to read and maintain. Additionally, Koa has a clearer and more concise API, is more modular, and has better integration with new JavaScript features. You can find the [official Koa documentation](https://koajs.com/) here.

### Prisma and Zod

The project also uses Prisma as an ORM to connect and manage the application's database. Prisma is an ORM tool that makes managing databases in Node.js applications easier. One advantage of Prisma is that it integrates well with Zod, a data schema validation library.

Zod provides an easy-to-read and write syntax for defining data schemas, and integrates well with TypeScript to provide a safer and more reliable programming experience. By defining your data schemas in Zod, you can be confident that data you receive from users or other sources is in the correct format and meets the defined constraints.

Then, by using Prisma to generate your database models from these schemas, you can ensure that your database models are consistent with the defined validation schemas, reducing the chance of errors. In other words, you can have a single source of truth for your data schemas and reduce the possibility of errors in your data and database. You can find the [official Prisma documentation](https://www.prisma.io/docs) and [official Zod documentation](https://zod.dev/) here.

### Tutorial

If you don't have much experience with TypeScript or Prisma ORM, you may be interested in watching the following tutorial: [REST API with TypeScript and Prisma ORM](https://www.youtube.com/watch?v=RebA5J-rlwg). This tutorial covers the basics of TypeScript and how it can be used with Node.js to create web applications.

## Conclusion

The project uses a set of technologies that allow for safer and faster development of web applications and APIs. By using TypeScript, Koa, Prisma, and Zod, we can have a safer, more organized, and more reliable programming experience. If you're new to these technologies, we recommend reviewing the documentation and tutorial so you can integrate into the project as soon as possible.
