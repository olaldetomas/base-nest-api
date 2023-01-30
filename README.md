# Base Nest API 

[![NestJS version](https://img.shields.io/badge/NestJS-9.0.0-red)](https://nestjs.com/)
[![PostgreSQL version](https://img.shields.io/badge/PostgreSQL-28.1.3-blue)](https://www.postgresql.org/)

Base NestJS scaffold using the default architecture proposed by nest with some services for start a new project create everything from scratch.

- Authentication 
    - *Local* 
    - *JWT* 
    - *Google*
- PostgresSQL 
- Docker postgres container 
- Config service
- Email service

## Installation

```bash
$ npm install
```
## Running the app

```bash
# up containers
npm run dev:up

# restart containers
npm run dev:rs

# development mode
npm run dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
