# Work Experience API

REST API built using Node.js, Express.js, Typescript, and PostgreSQL to allow users to create, update profile as well as their work experiences.

Deployed on Heroku: Make request to [https://work-experience-portfolio.herokuapp.com/api/v1](https://work-experience-portfolio.herokuapp.com/api/v1) to access the API
PostgreSQL database is hosted on Heroku Postgres

List of Technologies:

* [Express](https://www.npmjs.com/package/express)
  * Web framework for Node.js
* [Prisma](https://www.npmjs.com/search?q=prisma)
  * Javascript/Typescript ORM to interact with database
* [Helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers.
* [Dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
* [Cors](https://www.npmjs.com/package/cors)
  * CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
* [Zod](https://www.npmjs.com/package/zod)
  * TypeScript-first schema validation with static type inference

Development utilities:

* [Typescript](https://www.npmjs.com/package/typescript)
  * TypeScript is a language for application-scale JavaScript.
* [TS-node](https://www.npmjs.com/package/ts-node)
  * TypeScript execution and REPL for node.js, with source map and native ESM support.
* [Nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [ESlint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [Typescript-eslint](https://typescript-eslint.io/)
  * Tooling which enables ESLint to support TypeScript.
* [Jest](https://www.npmjs.com/package/mocha)
  * Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
* [Supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.

## Install dependencies

```
yarn

// or

npm install
```

## Test

```
yarn test

// or

npm run test

```

## Development
App will run on port 3000

```
yarn server

// or

npm run server
```

Note: Before running the server, make sure to create `.env` file and copy this config
```
DATABASE_URL="postgres://ytjyftirilvrax:8548983ed487d4c56658c4b0ca2e037ffa8970c70af29d23cd283f2e5df3c141@ec2-54-75-102-122.eu-west-1.compute.amazonaws.com:5432/d21oulglgjqp93"
SHADOW_DATABASE_URL="postgres://sidczgputwesnf:2daa680c34528133fa045166ff3c7dcd734a676dd46629653ef747d781985fb4@ec2-54-246-185-161.eu-west-1.compute.amazonaws.com:5432/ddd53ssmd30hsb"
PORT=3000
```


## Build
It runs `tsc` commands that compiles Typescript files to Javascript files to `/dist` directory

```
yarn build

// or

npm run build
```

## Run Javascript files (for Deployment)
It runs `tsc` commands that compiles Typescript files to Javascript files to `/dist` directory

```
yarn start

// or

npm start
```
