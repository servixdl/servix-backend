import {Router} from 'express';
import { salesControllers } from '../controller/sale.controller.js';
import { permission } from '../utils/auth.js';

const salesRoute = Router()

salesRoute.post("/",permission.verifyToken,salesControllers.createSale)

salesRoute.get("/",permission.verifyToken,salesControllers.getAllSales)

salesRoute.get("/seller/:rut",permission.verifyToken,salesControllers.searchByRutSale)

salesRoute.get("/:id",permission.verifyToken,salesControllers.getByIdSale)

salesRoute.put("/:id",permission.verifyToken,salesControllers.updateSale)

salesRoute.delete("/:id",permission.verifyToken,salesControllers.deleteSale)

export default salesRoute
