// helst bruk index.ts, men bruk denne hvis du bare vil teste noe smått

import { toNodeHandler } from "better-auth/node";
import express from "express";
import { auth } from "./auth.ts";
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.all("/api/auth/*", toNodeHandler(auth));
// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
