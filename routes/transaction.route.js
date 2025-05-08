import { transactionControllers } from "../controller/transaction.controller.js";
import { Router } from "express";
const transactionRoute = Router();
import { verifyToken } from "../middleware/auth.js";

transactionRoute.get("/user/:rut", verifyToken, transactionControllers.searchByRutSaleByRut);

export default transactionRoute;
