# Backend App overview

Test project to build a Form component split into 3 tabbed sections.

This backend was first built on MongoDB before recreating it on SQLite3 With Squelize. NodeJS,Express with TypeScript.

For more information about the task have a look at the [PDF](https://fvpublic.s3.eu-west-1.amazonaws.com/test/design.pdf)

The Frontend service for this application can be found here [Finer Visions]()

# Setting up the development environment

Please visit [a](https://redux-toolkit.js.org) and make sure you get to [Getting Started with Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)

## Running the app

### Install

1. Run [`npm install | npm i`]at the root of the project.
   This will allow npm to download all the required dependancies needed to get the app running.

2. Make sure all [`*.config.{js,ts}`] files are present in project directory.

### Start

Run [`npm start`] at the root of the project. This runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Test

Run [`npm test`] at the root of the project. This runs tests on the app using jest in the development mode. Open IDE terminal to view results.

### Start TypeScript Compiler

Run [`tsc -w`] at the root of the project. This runs the TypeScript Compiler in WatchMode. This project has been set to watch all .ts,.tsx files within the project directory. For more information about [TypeScript] visit [typescriptlang.org/docs](https://www.typescriptlang.org/docs/handbook/react.html)

### Releases

None.

### Packages

[`TailwindCSS`] was used in this application. For more information about [TailwindCSS] visit [TailwindCSS.com](https://tailwindcss.com/docs/installation)

[`React-Toastify`] was used in this application. For more information about [ReactToastify] visit [fkhadra.github.io/react-toastify](https://fkhadra.github.io/react-toastify/introduction/)
