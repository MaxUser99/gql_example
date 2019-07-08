import { ApolloServer } from "apollo-server-express";
import { schema } from "./gql";
import express from "express";
import http from "http";

const app = express();

const server = new ApolloServer({ schema });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.applyMiddleware({
  app
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.argv.pop() || 4000;
httpServer.listen(port, () => {
  console.log("fuck is it working?: ", httpServer.address().port)
  console.log("hello world)");
});
