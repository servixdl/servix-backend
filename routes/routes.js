<<<<<<< HEAD:routes/routes.js
import {Router} from 'express';
import serviceRoute from "./service.route.js";
import userRoute from "./user.route.js";
import saleRoute from './sale.route.js';
import appointmentRoute from "./appointment.route.js"
const routes = Router();

routes.use('/appointment',appointmentRoute)

routes.use('/services',serviceRoute)

routes.use('/users',userRoute)

routes.use('/sales',saleRoute)

//routes.get("*",(req,res)=>{res.status(404).send("La pagina no existe")});


=======
import {Router} from 'express';
import serviceRoute from "./service.route.js";
import userRoute from "./user.route.js";
import saleRoute from './sale.route.js';
import appointmentRoute from "./appointment.route.js"
import transactionRoute from './transaction.route.js';
import localityRoutes from './locality.route.js';
const routes = Router();

routes.use('/appointments',appointmentRoute)

routes.use('/services',serviceRoute)

routes.use('/users',userRoute)

routes.use('/sales',saleRoute)

routes.use('/transactions',transactionRoute)

routes.use('/localities',localityRoutes)

//routes.get("*",(req,res)=>{res.status(404).send("La pagina no existe")});


>>>>>>> 467c85a05ccf5a874d058722e2267d9d3682523b:src/routes/routes.js
export default routes;