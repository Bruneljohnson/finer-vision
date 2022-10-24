# Backend App overview

Test project to build a Form component split into 3 tabbed sections.

This backend was first built on MongoDB before recreating it on SQLite3 With Squelize. NodeJS,Express with TypeScript.

For more information about the task have a look at the [PDF](https://fvpublic.s3.eu-west-1.amazonaws.com/test/design.pdf)

The Frontend service for this application can be found here [Finer Visions FrontEnd](https://github.com/Bruneljohnson/finer-vision/tree/main/front-end)

# Setting up the development environment

Please visit [Squelize.org](https://sequelize.org) and make sure you get to [Getting Started](https://sequelize.org/docs/v6/getting-started/)

## Running the app

### Install

1. Run [`npm install | npm i`]at the root of the project.
   This will allow npm to download all the required dependancies needed to get the app running.

2. Make sure all [`*.config.{js,ts}`] files are present in project directory.
3. Install [SQLite] & [`SQLite Viewer`] from your VS CODE Marketplace.

### Start

Run [`npm run dev`] at the root of the project. This runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Start TypeScript Compiler

Run [`tsc -w`] at the root of the project. This runs the TypeScript Compiler in WatchMode. This project has been set to watch all .ts,.tsx files within the project directory. For more information about [TypeScript] visit [typescriptlang.org/docs](https://www.typescriptlang.org/docs/handbook/react.html)

### Releases

None.

### Packages

[`Squelize & SQLite`] were used in this application.

[`ExpressValidator`] was used in this application. For more information about [Express-Validator] visit [https://express-validator.github.io/docs/](https://express-validator.github.io/docs/check-api.html)

For all other packages used in this file please check the [package.json] file.
