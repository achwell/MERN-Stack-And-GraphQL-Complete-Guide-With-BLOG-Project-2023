import express from "express";
import {config} from "dotenv";
import cors from "cors";
import {graphqlHTTP} from "express-graphql";
import {connectToDatabase} from "./utils/connection";
import schema from "./handlers/handlers"

config();

const app = express();
app.use(cors());
app.use("/graphql", graphqlHTTP({schema, graphiql: true, pretty: true}));

connectToDatabase()
    .then(() => app.listen(process.env.PORT, () => console.log(`Server open on port ${process.env.PORT}`)))
    .catch(err => console.error({err}))
