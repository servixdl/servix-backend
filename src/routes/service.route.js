import { Router } from "express";
import { serviceController } from "../controller/service.controller.js";
import { verifyToken } from "../middleware/auth.js";
const serviceRoute = Router();

serviceRoute.get("/", serviceController.getAllServices);

serviceRoute.get("/:id", serviceController.getByIdService);

serviceRoute.get("/name/:parameter", serviceController.searchByNameService);

serviceRoute.post("/", verifyToken, serviceController.createService);

serviceRoute.put("/:id", verifyToken, serviceController.updateService);

serviceRoute.delete("/:id", verifyToken, serviceController.deleteService);

export default serviceRoute;
