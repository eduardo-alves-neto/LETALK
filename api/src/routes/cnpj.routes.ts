import { Router, Request, Response } from "express";
import { asyncHandler } from "../middlewares/async-handler";
import { validateCnpjParam } from "../middlewares/validate-cnpj";
import { fetchCnpjFromBrasilApi } from "../services/brasilapi.service";
import { transformBrasilApiResponse } from "../utils/data-transformer";

const router = Router();

router.get(
  "/:cnpj",
  validateCnpjParam,
  asyncHandler(async (req: Request, res: Response) => {
    const cnpj = String(req.params.cnpj);

    const rawData = await fetchCnpjFromBrasilApi(cnpj);
    const transformedData = transformBrasilApiResponse(rawData);

    res.status(200).json(transformedData);
  }),
);

export { router as cnpjRouter };
