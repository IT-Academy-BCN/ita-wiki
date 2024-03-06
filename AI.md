# Use of AI Coding Assistant Tools in the Project

## Introduction

This is a simple guide to clarify common questions and best practices for new comers on how to use AI tools to help with project tasks.

- Is it allowed to use AI coding assistants? **Yes**.
- Is it ethical to use AI coding assistants? **Yes**, as long as it's used responsibly and the generated content is reviewed and validated by a human.
- How can AI coding assistants help in the project? AI coding assistants can help with tasks such as generating code snippets, debugging, and providing documentation outlines.
- What are the best practices for using AI coding assistants? Be specific in your prompts, provide context, and iterate on prompts based on responses received.
- Being a novice, is it a good idea to use AI coding assistants? Yes, it's a great way to learn and get help with coding tasks. However, it's important to understand the generated content and not rely solely on it. Moreover, **your purpose must primarly be to accelarate your learning**.
- Should I use AI coding assistants for all coding tasks? No, it's best to use AI coding assistants for specific tasks where you need help or guidance.
- Do you give support for using AI coding assistants? Nothing more than this guideline.

## Available AI Tools

There are many available AI Tools that assist with coding related tasks. We will use for this guide the free version of ChatGPT.

ChatGPT is a state-of-the-art language model developed by OpenAI that can understand and generate human-like text based on the prompts it receives. It's a versatile tool that can assist with various tasks, from coding help to content creation.

## Getting Started with ChatGPT

1. Visit https://chat.openai.com/
2. Open an account
3. Start using the tool

## Crafting Effective Prompts

- **Be Specific**: The more detailed your prompt, the more accurate and useful ChatGPT's response will be.
- **Context Matters**: Providing context helps ChatGPT give responses aligned with project requirements.
- **Iterative Approach**: Encourage refining and iterating on prompts based on responses received.

## Common use cases

- **Debugging Code**: How to describe a bug and ask for solutions.
- **Generating Code**: Asking for code examples based on project specifications.
- **Generating Tests**: Asking for code examples based on project specifications.
- **Documentation**: Generating documentation outlines or content ideas.
- **Learning**: Finding resources on specific technologies or methodologies used in the project.

## Prompts to get started

### Folder structure

A good starting point is to ask ChatGPT about the project folder structure, here's the prompt:

```
I'm joined a project and I am not sure about the folder structure. Can you help me with that?
- .github
- config
    - dev
        - service_sso.yml
        - service_wiki.yml
        - web_usuaris.yml
        - web_wiki.yml
    - prod
- packages
    - schemas
    - ui
- scripts
- services
    - sso
    - wiki
- web
    - usuaris
    - wiki
- README.md
- ...

```

Add more contextual information as needed.
Iterate and refine the prompts based on the responses received.
Get more specific within each folder, for example, if you're a React developer, ask about the React folder structure.

### Help with the first issue

Issues are defined in the project's issue tracker. Usually, newcomers find themselves lost, so it's a good idea to ask ChatGPT for help on the first issue. Take on the previous prompt and try to find where the changes described in your issue, fit within our project structure.

```
I'm working on my first issue, and I'm not sure where to start. The issue is about adding a new feature to the login page. Can you help me with that?

Below is the folder structure of the project:
- src
    - __mocks__
    - __tests__
    - assets
    - components
        - atoms
        - molecules
        - organisms
        - ...
    - hooks
    - locales
    - pages
    - types
    - utils
    - App.tsx
    - ...
```

Add more contextual information as needed.
Iterate and refine the prompts based on the responses received.
Get more specific within each folder, for example, if you're a React developer, ask about the React folder structure.

### Getting started with code generation

ChatGPT can help you generate code snippets. Here's an example prompt:

```
I have to implement a react component that renders a list of checkboxes dynamically. It must allow to hold disabled and enabled state and filter them. Can you help me with that?
```

### Getting started with test generation

ChatGPT can help you generate test cases. Here's an example prompt:

```
I have to implement a test with Jest, React Testing Library and for the following component:

export const Button: FC<TButton> = ({
  type = 'submit',
  secondary = false,
  outline = false,
  size = 'normal',
  children,
  ...rest
}) => (
  <StyledButton
    type={type}
    data-testid="button"
    secondary={secondary}
    outline={outline}
    size={size}
    {...rest}
  >
    {children}
  </StyledButton>
);

Can you help me with that?
```
