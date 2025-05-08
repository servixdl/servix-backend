import { localityController } from "../src/controller/locality.controller.js";
import { Router } from "express";

const localityRoutes = Router();


localityRoutes.get("/region", localityController.getAllRegions);

localityRoutes.get("/comunes/:id",localityController.getByIdRegion)

export default localityRoutes;