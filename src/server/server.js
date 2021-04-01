import { resolvers, schema } from "./schema";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import cors from "cors";
import { PORT } from "../commons/envs";

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(schema),
    rootValue: resolvers,
    graphiql: true,
  })
);
const webServer = app.listen(PORT, () =>
  console.log(`
    Server started on port ${PORT}
    Access graphql server at /graphql
  `)
);
const signals = ["SIGTERM", "SIGINT", "SIGHUP", "SIGUSR2"];
signals.forEach((signal) => {
  process.on(signal, () => {
    shutdown();
  });
});
process.on("uncaughtException", function (err) {
  console.error(err.stack);
  shutdown();
});
function shutdown() {
  webServer.close();
  process.exit(0);
}
