# my-deno-playground

This is just a dummy CRUD API to test out Deno

## Dependencies

You need deno 1.13.2 (release, x86_64-apple-darwin) installed in your system.

## How to run the API server

Execute in the project folder

```
bin/run
```

```
OPTIONS
 -d        Run it in development mode. It runs a watcher and doesnt check 
           typings for faster reloading.
 -u        Update locked dependencies before running the server.
 -l        Run linter before running the server.
 -r        Reload all cached dependencies before running server.
```

## How to run tests

Execute in the project folder

```
bin/test
```

## Project structure

### /bin

Binary files to execute the app, tests or others.

### /controllers

HTTP API REST controllers. Classes performing HTTP parametters validation and
pointing to the corresponding service.

### /logic

Classes containing business logic that can be reused in different services.

### /models

API REST models. Classes responsible for accesssing and storing the resources data.

### /routes

HTTP API REST routes. Classes describing the URL patterns to perform operations, 
GET, POST, PUT, PATCH and DELETE on resources.

### /services

Classes responsible for the interaction with the API resources. The services are
a way to decouple the logic of the app from how to access this logic. A service
could be accessed through the controllers for HTTP requests or alternatively 
through websockets or some other way.

### /types

Typescript type definitions.

### /utils

Files containing code that can be helpful for the app, but also can be ported 
to other apps.

## FAQs

### Why using relative path module importing ?

Deno uses relative path importing. To use absolute paths you need to implement
import-map.json

### Why using abstract classes for controllers, services and routes ?

To make sure they are not instantiated. This is because my intention is to make
these classes stateless and inmmutable, and so, predictable. They will always 
behave the same for every request. They behave more like a collection of functions 
that are wrapped in classes just for naming convinience. 

### I generated a controller, service, router and model for a resource, but it doesn't work

After generation, you need to add the router in /routes/mod.ts registerRoutes 
function and the model in /models/mod.ts registerModels function.
