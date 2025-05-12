import { Router } from 'express';
import serviceRoute from "./service.route.js";
import userRoute from "./user.route.js";
import saleRoute from './sale.route.js';
import appointmentRoute from "./appointment.route.js";
import transactionRoute from './transaction.route.js';
import localityRoutes from './locality.route.js';
import typeServiceRoute from './typeServices.router.js';
const routes = Router();

routes.use('/appointments', appointmentRoute);
routes.use('/services', serviceRoute);
routes.use('/users', userRoute);
routes.use('/sales', saleRoute);
routes.use('/transactions', transactionRoute);
routes.use('/localities', localityRoutes);
routes.use('/types_services',typeServiceRoute)

// routes.get("*", (req, res) => { res.status(404).send("La pagina no existe") });

export default routes;

