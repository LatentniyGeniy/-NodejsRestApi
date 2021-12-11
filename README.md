# REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package
  manager.
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop).

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

## Or Running via docker

Run in terminal:

```
 docker-compose up
```

If you want to stop, press the keyboard shortcut first **Ctrl+C**, then enter in the terminal:

```
 docker-compose down
```

Rebuild images & start containers:

```
 docker compose up --build
```

Сonnected services:

- PostgreSQL
- pgAdmin
- Express

## **Migrations**

Running migrations:

```
$ npm run migration:run
```

Revert migration:

```
$ npm run migration:revert
```