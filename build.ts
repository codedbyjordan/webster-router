import dts from "bun-plugin-dts";

await Bun.build({
  entrypoints: ["./src/index.ts", "./src/webster-router.d.ts"],
  outdir: "./dist",
  minify: true,
  plugins: [dts()],
});
