import Elysia, { Context, RouteSchema } from "elysia";
import { HTTP_METHODS } from "./constants";

export type IndexableElysia = Elysia & {
  [key: string]: any;
};

export interface Route {
  handler: (context: Context) => unknown;
  schema?: RouteSchema;
}

export async function loadRoutes(app: IndexableElysia) {
  const importPromises = [];
  const routeModules: Record<string, any> = {};

  const router = new Bun.FileSystemRouter({
    style: "nextjs",
    dir: "./src/routes",
  });

  for (const [routeName, file] of Object.entries(router.routes)) {
    importPromises.push(
      import(file).then((module) => (routeModules[routeName] = module))
    );
  }

  await Promise.all(importPromises);

  for (const [routeName, routeModule] of Object.entries(routeModules)) {
    const groupName = routeName.split("/")[1];
    for (const method of HTTP_METHODS) {
      const routeModuleMethod = routeModule[method];
      if (!routeModuleMethod) continue;
      app.group(groupName, () =>
        app[method](
          routeName,
          routeModuleMethod.handler,
          routeModuleMethod.schema
        )
      );
    }
  }
}

export async function router() {
  const routesPlugin = new Elysia();
  await loadRoutes(routesPlugin);

  return routesPlugin;
}
