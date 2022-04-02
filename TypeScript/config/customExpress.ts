import express from "express";
import consign from "consign";
import bodyParser from "body-parser";
import { router } from "../controllers/atendimentos";

export const customExpress = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(router);
  consign().include("controllers").into(app);

  return app;
};
