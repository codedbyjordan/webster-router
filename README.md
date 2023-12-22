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
import type { Route } from "webster-router";

export const get: Route = {
  handler: () => "Hello, Webster!",
};
```

Routes are defined as variables whose names are HTTP verbs. If you're using TypeScript, make sure to import the `Route` type. This means that one route file can handle multiple methods

```ts
export const get: Route = {
  handler: () => "Hello, Webster!",
};

export const delete: Route = {
  handler: () => "Bye, Webster. :(",
};
```

Each route is passed an Elysia [Context](https://elysiajs.com/essential/context.html)

```ts
export const get: Route = {
  handler: (context) => context.path,
};
```

To define a schema, add a `schema` property to a method object, and define the schema the same way you would in a normal Elysia app

```ts
import { t } from 'elysia'

export const get: Route = {
  schema: {
    query: t.Object({
      name: t.String()
    })
  }
  handler: (context) => context.path,
};
```

### Dynamic Routes

To create a dynamic route, create a folder with the `:<parameter-name>` format. For example, if we want to create a path that takes in an `id` parameter, we'd create a folder called `:id`. Elysia will put the `id` value in `context.params`

```ts
export const get: Route = {
  handler: ({ params }) => {
    return params.id;
  },
};
```

Now, if we visit `/123`, we will see '123' returned back to us.
