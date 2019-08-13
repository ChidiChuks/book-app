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