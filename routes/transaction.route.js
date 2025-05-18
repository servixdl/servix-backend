import { transactionControllers } from "../src/controller/transaction.controller.js";
import { Router } from "express";
const transactionRoute = Router();
import { verifyToken } from "../middleware/auth.js";

transactionRoute.get("/user/:rut", verifyToken, transactionControllers.searchByRutSaleByRut);

transactionRoute.post("/provisionalSale",verifyToken,transactionControllers.createProvisionalSale)

transactionRoute.get("/:id",verifyToken,transactionControllers.getByIdOrder)

export default transactionRoute;
