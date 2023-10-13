import "dotenv/config";
import express = require("express");
import { dataSource } from "./app.data-source";
import { globalRouter } from "./const/router.const";
import * as cors from "cors";
import { Request, Response, NextFunction } from "express";


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", globalRouter);

dataSource
  .initialize()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(`Something went wrong. ${err}`);
  });

interface CustomError extends Error {
  statusCode?: number;
}

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send(message);
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server is up at port 4000");
});

export default app;
