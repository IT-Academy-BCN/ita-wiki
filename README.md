# ITA Wiki


ITA Wiki is a project built with React.js and Node.js for students at the IT Academy from Barcelona Activa. The goal is to allow them to familiarize themselves with a generic development setup that could be found in other places. One of the purposes of this project is to allow students to deal with new features, legacy code, fixes and teamwork challenges. As a consequence the priority is not only excellent technical execution, but to provide a full learning experience to our students. 
- <a href="https://www.figma.com/file/ScWpDKxEB3wEGbztXMSJO3/MVP-Wiki-IT-Academy">Visual design</a>·
- <a href="https://github.com/it-academyproject/ita-directory/issues">Report Bug</a>.
- <a href="https://github.com/it-academyproject/ita-directory/issues">Request Feature</a>.


<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#swagger-docs">Swagger Docs</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

### Built With

- [React](https://reactjs.org/)
- [Nodejs](https://nodejs.dev/)
- [PostgreSQL](https://www.postgresql.org/)

<!-- GETTING STARTED -->

### Requirements

1. Docker
2. Bash terminal
3. Git pull-request and issue flows.

### How to work with GIT

1. When new features or fixes are required we create a new issue.
2. Issues are assigned to one person.
3. The number of the issue is created as a new branch name following git branch naming conventions: https://deepsource.io/blog/git-branch-naming-conventions/
4. Once the issue is resolved, a new pull-request from your branch to main is required.

### Getting Started
Create a settings.json inside the .vscode file with the following content:
```
{
    "eslint.workingDirectories": ["frontend", "backend"]
}
```
_The code above allows the ESLint VSCode extension to properly find each ESLint project configuration file._

<!-- LICENSE -->

<!-- ## License

Distributed under the MIT License. See `LICENSE` for more information. -->
