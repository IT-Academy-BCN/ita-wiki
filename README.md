# ITA Wiki


ITA Wiki is a project built with React.js and Node.js for students at the IT Academy from Barcelona Activa. The goal is to allow them to familiarize themselves with a generic development setup that could be found in their future career. One of the purposes of this project is to allow students to deal with new features, legacy code, fixes and teamwork challenges. As a consequence the priority is not only excellent technical execution, but to provide a full learning experience to our students.

If you're a new student landign on the project, please read everything before getting started.

## Newcomers

Welcome to the IT-Academy-BCN's Wiki GitHub repository! We're glad to have you on board. This section will guide you through the process of getting started with our project, which is divided into frontend and backend development. To help you understand the importance of our onboarding process, we'll discuss the benefits of the Work Breakdown Structure (WBS), our Git workflow, and the tools and libraries you'll need to familiarize yourself with. Remember, be proactive and seek answers on Google and Stack Overflow when you encounter challenges.

Quicklinks:

- <a href="https://www.figma.com/file/ScWpDKxEB3wEGbztXMSJO3/MVP-Wiki-IT-Academy">Visual design</a>.
- <a href="https://dev.itadirectory.eurecatacademy.org/">Development server</a>.


### Frontend and Backend

Our project is divided into two main areas: frontend and backend development. Depending on your itinerary specialization you will be working on one or the other. Fullstack profiles are also welcome.

### Frontend Development

Frontend developers are responsible for creating and maintaining the user interface, ensuring that the website is visually appealing, user-friendly, and responsive. Our frontend is built with React, Vite, and Vitest. We also use an atomic design system and a CI/CD pipeline to lint, test, build, and deploy the project on the development environment.

#### Frontend Libraries and Tools
* React: A JavaScript library for building user interfaces.
* Vite: A build tool and development server that focuses on speed and simplicity.
* Vitest: A testing framework designed to work seamlessly with Vite.
* Atomic Design System: A methodology for creating design systems by breaking down components into atoms, molecules, and organisms.

### Backend Development
Backend developers are responsible for managing the data, logic, and server-side infrastructure of the website. They ensure that data is transferred smoothly between the frontend and backend, as well as handle database management, API integration, and server-side programming. Our backend stack includes Koa, Prisma (ORM), Supertest, Docker, PostgreSQL, and bash terminal, with a basic routing/router/repo folder structure.

#### Backend Libraries and Tools
* Koa: A lightweight and flexible web framework for Node.js.
* Prisma: A modern ORM (Object Relational Mapping) library that simplifies database management and data querying.
* Supertest: A library for testing HTTP servers and APIs, making it easy to assert, test, and simulate HTTP requests and responses.
* Docker: A platform that simplifies the process of building, shipping, and running applications in containers, ensuring consistency across different environments.
* PostgreSQL: A powerful, open-source object-relational database system.
* Bash Terminal: A command-line interface for interacting with the operating system, executing commands, and running scripts.
  
In both frontend and backend, we use Zod schemas for validation, which provides a convenient and efficient way to ensure data consistency and integrity across the application.

### Work Breakdown Structure (WBS) and Onboarding
The Work Breakdown Structure (WBS) is a key project management tool that helps us break down tasks and deliverables into manageable units. This approach allows for better organization, tracking, and allocation of resources. Our onboarding process may seem challenging, but it is crucial in understanding the project structure, workflow, and coding standards.

By going through this onboarding process, you'll:

- Gain a comprehensive understanding of the project's goals and requirements.
- Learn how to collaborate effectively with the team.
- Familiarize yourself with the tools and technologies used in the project.
- Be better prepared to contribute meaningfully and efficiently to the project.

### Being Proactive
While we encourage collaboration and support among team members, it's important for you to be proactive in your learning and problem-solving. Before reaching out for help, try to search for answers on Google and Stack Overflow. These resources contain a wealth of information and can often help you solve issues on your own. By doing so, you'll develop your problem-solving skills and become a more self-sufficient developer.


### How to work with GIT

1. When new features or fixes are required we create a new issue.
2. Issues are assigned to one person.
3. The number of the issue is created as a new branch name following git branch naming conventions: https://deepsource.io/blog/git-branch-naming-conventions/
4. Once the issue is resolved, a new pull-request from your branch to main is required.

### Setup ESLint in VSCode
Create a settings.json inside the .vscode file with the following content:
```
{
    "eslint.workingDirectories": ["front", "back"]
}
```
The code above allows the ESLint VSCode extension to properly find each ESLint project configuration file. This will help ensure that you're following the project's coding standards and guidelines as you contribute to the project.

With this guide, we hope you feel better prepared to contribute to our project. Remember, don't hesitate to ask questions and reach out for support if needed. We're excited to have you on board and look forward to your contributions!


### Registering bash to npm 

Windows users should register Bash as the default shell for launching npm scripts in order to run `npm run up` successfully, as seen [in this article](https://dsebastien.medium.com/fixing-bash-is-not-recognized-as-an-internal-or-external-command-when-used-within-npm-scripts-on-61614391e417).