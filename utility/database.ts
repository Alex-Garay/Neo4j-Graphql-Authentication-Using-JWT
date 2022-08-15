import "dotenv/config";
import { typeDefs } from "../graphql/types";
import { resolvers } from "../graphql/resolvers";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { OGM } from "@neo4j/graphql-ogm";
import * as neo4j from "neo4j-driver";

export const driver = neo4j.driver(
  `${process.env.NEO4J_URI}`,
  neo4j.auth.basic(
    `${process.env.NEO4J_USERNAME}`,
    `${process.env.NEO4J_PASSWORD}`
  )
);

export const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
  resolvers,
});

export const ogm = new OGM({ typeDefs, driver });
export const User = ogm.model("User");
