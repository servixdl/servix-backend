import {Router} from 'express';
import { verifyToken } from '../middleware/auth.js';
import { ServiSolicController } from '../src/controller/ServiSolic.Controller.js';


const ServiSoliRoute = Router()


ServiSoliRoute.get("/:rut", verifyToken, ServiSolicController.getBitacora);
ServiSoliRoute.put("/cancelar/:id", verifyToken, ServiSolicController.cancelar);
ServiSoliRoute.delete("/eliminar/:id", verifyToken, ServiSolicController.eliminar);

export default ServiSoliRoute;