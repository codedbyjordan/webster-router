# Webster Router

An easy-to-use, file-based router to Elysia

## Usage

### Register Plugin

To use Webster in your Elysia app, register it on your Elysia instance.

```ts
import { Elysia } from "elysia";
import { webster } from "webster-router";

const app = new Elysia()
  .use(
    webster({
      dir: "./src/my-routes", // uses src/routes by default
    })
  )
  .listen(3000);
```

### Creating a route

```ts
// routes/index.ts
export const get = {
  handler: () => "Hello, Webster!",
};
```

Routes are defined as variables whose names are HTTP verbs. This means that one route file can handle multiple methods

```ts
export const get = {
  handler: () => "Hello, Webster!",
};

export const delete = {
  handler: () => "Bye, Webster. :(",
};
```

Each route is passed an Elysia [Context](https://elysiajs.com/essential/context.html)

```ts
export const get = {
  handler: (context) => context.path,
};
```

To define a schema, add a `schema` property to a method object, and define the schema the same way you would in a normal Elysia app

```ts
import { t } from 'elysia'

export const get = {
  schema: {
    query: t.Object({
      name: t.String()
    })
  }
  handler: (context) => context.path,
};
```
