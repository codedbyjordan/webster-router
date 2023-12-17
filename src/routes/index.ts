import { t } from "elysia";

export const get = {
  schema: {
    headers: t.Object({
      authorization: t.String(),
    }),
  },

  handler: () => {
    return "test";
  },
};
