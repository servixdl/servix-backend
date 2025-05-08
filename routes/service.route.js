import {Router} from 'express';
import { serviceController } from '../src/controller/service.controller.js';
import { permission } from "../src/utils/auth.js";
const serviceRoute = Router();

serviceRoute.get("/",serviceController.getAllServices)

serviceRoute.get("/:id",serviceController.getByIdService)

serviceRoute.get("/name/:parameter",serviceController.searchByNameService)

serviceRoute.post("/",permission.verifyToken,serviceController.createService) 


serviceRoute.put("/:id",permission.verifyToken,serviceController.updateService)

serviceRoute.delete("/:id",permission.verifyToken,serviceController.deleteService)


export default serviceRoute;