import { Router } from "express";
import { cnpjRouter } from "./cnpj.routes";

const v1Router = Router();

v1Router.use("/cnpj", cnpjRouter);

export { v1Router };
