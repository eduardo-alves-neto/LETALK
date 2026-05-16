import { Router } from "express";
import { getCnpj } from "../controllers/cnpj.controller";

const router = Router();

router.get("/:cnpj", getCnpj);

export { router as cnpjRouter };
