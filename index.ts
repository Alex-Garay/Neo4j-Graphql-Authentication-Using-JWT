import { neoSchema, ogm } from "./utility/database";
import { context } from "./graphql/context";
import { ApolloServer } from "apollo-server";

Promise.all([neoSchema.getSchema(), ogm.init()]).then(([schema]) => {
  const server = new ApolloServer({
    schema,
    context: context,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
