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


export default routes;