import { permission } from "../utils/auth.js";
import { appointmentController } from "../controller/appointment.controller.js";
import {Router} from 'express';
const appointmentRoute = Router();


appointmentRoute.post("/",permission.verifyToken,appointmentController.createAppointment)

appointmentRoute.get("/",permission.verifyToken,appointmentController.getAllAppointment)

appointmentRoute.get("/user/:rut",permission.verifyToken,appointmentController.searchByRutAppointment)

appointmentRoute.get("/:id",permission.verifyToken,appointmentController.getByIdAppointment)

appointmentRoute.put("/:id",permission.verifyToken,appointmentController.updateAppointment)

appointmentRoute.delete("/:id",permission.verifyToken,appointmentController.deleteAppointment)

export default appointmentRoute;


