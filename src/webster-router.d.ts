declare module "webster-router" {
  import { ElysiaContext } from "elysia"; // Replace with actual import from Elysia

  export interface Route {
    handler: (context: ElysiaContext) => any; // Replace 'any' with a specific type if needed
    schema?: RouteSchema;
  }
}

declare global {
  interface RouteFileExports {
    get?: Route;
    post?: Route;
    put?: Route;
    patch?: Route;
    delete?: Route;
    options?: Route;
    head?: Route;
    all?: Route;
  }

  // Assuming route files are in a folder named 'routes'
  module "*/routes/*" {
    const exports: RouteFileExports;
    export = exports;
  }
}

export {};
