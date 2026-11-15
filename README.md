# Shrimpventory

A web app that hosts a collection of small, random tools.

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) with [SWC](https://swc.rs/) (`@vitejs/plugin-react-swc`)
- [Nx](https://nx.dev/) for workspace and task orchestration
- [Ant Design](https://ant.design/) for UI components
- [Zustand](https://zustand.docs.pmnd.rs/) for state management
- [ts-pattern](https://github.com/gvergnaud/ts-pattern) for pattern matching
- [Vitest](https://vitest.dev/) for testing
- [Biome](https://biomejs.dev/) for linting and formatting

## Architecture

The code follows **Functional Core, Imperative Shell (FCIS)**: business logic lives in pure, easily tested functions (the core), and side effects such as I/O, state and rendering are kept in a thin outer layer (the shell).

## Getting started

```bash
npm install
```

More scripts will be documented once the project is scaffolded.
