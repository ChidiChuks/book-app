# BOOK-APP

### Creating the back-end of a book application and trying technologies like Restful API with NodeJS, Express, PostgreSQL, Sequelize, Travis, Mocha, Coveralls and Code Climate.

##### NodeJS is becoming a backend language of choice for many developers.
In this article, I am going to work you through building a Simple Restful API with:
NodeJS — For writing Javascript server-side applications
Express — A NodeJS framework
PostgreSQL — An open source object-relational database
Sequelize — An ORM (Object Relational Mapping) of PostreSQL
Travis — A continuous integration service for Testing Applications
Coveralls — A web service to help you track your code coverage over time.
Code Climate — Provides automated code review for maintainability and test coverage.
Babel — To convert ES6 javascript code to ES5
Though overwhelming, but you learn how to use these technologies simultaneously.

## To initialize Node Package Manager
[-] npm init -y

## To install Express and Body-parser
[-] npm install --save-dev express body-parser

## To install Babel
[-] npm install --save-dev @babel/core @babel/cli @babel/node @babel/plugin-transform-runtime @babel/preset-env @babel/register @babel/runtime babel-loader

[-] create a .babelrc file on root folder with preset and plugins settings

## To install eslint and airbnb style guide
[-] npm install --save-dev eslint eslint-config-airbnb-base eslint-plugin-import

[-] create a .eslintrc.js file for eslint config on root folder

## To install nodemon (a watcher for node)
[-] npm install -g nodemon

[-] setup dev-nodemon in scripts block of code of package.json file

## Setup PostgreSQL Database
[-] download (install) the postgreSQL

## Setup Sequelize (An ORM(Object Relational Mapping))
[-] npm install -g sequelize-cli

## Setup Path
[-] npm install --save path

## Install PostgreSQL and Sequelize dependencies
[-] npm install --save sequelize pg pg-hstore

## Initialize Sequelize
[-] sequelize init

## Installing dotenv
[-] npm install --save dotenv

## Create a .env file
[-] with the necessary properties and values {DB_NAME, DB_USER, DB_PASS, DB_PORT, DB_HOST, SECRET_KEY}

## Create Databases, Model, Migration
[-] create the databases --- {pg_ctl -D "C:\Program Files\PostgreSQL\10\data" start --- This line of code ensures that PostgreSQL server is running or has started or activated} --- createdb books | createdb book_test

[-] create the model ----- {sequelize model:create --name Book --attributes title:string, price:string, description:string}

[-] refactor migration file --- {sequelize db:migrate}


## Create Services, Controllers, Routes and Utilities
[-] creating four folders for codes each naming {services, controllers, routes, utilities}

## Write test cases for Endpoints
[-] install mocha, chai and nyc --- npm install --save-dev mocha chai chai-http nyc 