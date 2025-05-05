import { Router } from "express";
import { salesControllers } from "../controller/sale.controller.js";
import { verifyToken } from "../middleware/auth.js";

const salesRoute = Router();

salesRoute.post("/", verifyToken, salesControllers.createSale);

salesRoute.get("/", verifyToken, salesControllers.getAllSales);

salesRoute.get("/seller/:rut", verifyToken, salesControllers.searchByRutSale);

salesRoute.get("/:id", verifyToken, salesControllers.getByIdSale);

salesRoute.put("/:id", verifyToken, salesControllers.updateSale);

salesRoute.delete("/:id", verifyToken, salesControllers.deleteSale);

export default salesRoute;
