import { Elysia } from "elysia";
import { router } from "./router";

const app = new Elysia().use(router()).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
