# Task Manager

Open-source desktop app for managing tasks on kanban board in local environment.

You can clone the repo or download one of the [releases](https://github.com/m-emre-yalcin/task-manager/releases) for start using it.

You can use it on browser as well: [demo](https://task-manager-nine-lemon.vercel.app/)

_This repo is open for any contribution!_

![task manager screenshot](https://github.com/m-emre-yalcin/task-manager/blob/master/screenshots/Screenshot%202022-08-04%20061605.png)
![task manager screenshot](https://github.com/m-emre-yalcin/task-manager/blob/master/screenshots/Screenshot%202022-08-04%20061704.png)
![task manager screenshot](https://github.com/m-emre-yalcin/task-manager/blob/master/screenshots/Screenshot%202022-08-04%20061725.png)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run electron:dev
```

#### OR

```sh
npm run dev
```

```sh
npm run electron .
```

### Type-Check, Compile and Minify for Production

```sh
npm run build:tc
```

### Build Electron App

```sh
npm run dist
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
