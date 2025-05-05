import { verifyToken } from "../middleware/auth.js";
import { appointmentController } from "../controller/appointment.controller.js";
import { Router } from "express";
const appointmentRoute = Router();

appointmentRoute.post(
  "/",
  verifyToken,
  appointmentController.createAppointment
);

appointmentRoute.get("/", verifyToken, appointmentController.getAllAppointment);

appointmentRoute.get(
  "/user/:rut",
  verifyToken,
  appointmentController.searchByRutAppointment
);

appointmentRoute.get(
  "/:id",
  verifyToken,
  appointmentController.getByIdAppointment
);

appointmentRoute.put(
  "/:id",
  verifyToken,
  appointmentController.updateAppointment
);

appointmentRoute.delete(
  "/:id",
  verifyToken,
  appointmentController.deleteAppointment
);

export default appointmentRoute;
