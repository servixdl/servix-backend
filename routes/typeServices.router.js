import {Router} from 'express';
import { verifyToken } from "../middleware/auth.js";
import {typeservicesController} from '../src/controller/typesServices.controller.js';
const typeServiceRoute = Router();

typeServiceRoute.get("/",typeservicesController.getAllTypeServices);

typeServiceRoute.get("/:id",typeservicesController.getByIdTypeService);

typeServiceRoute.post("/",verifyToken,typeservicesController.createTypeService); 

typeServiceRoute.delete("/:id",verifyToken,typeservicesController.deleteTypeService);

export default typeServiceRoute;