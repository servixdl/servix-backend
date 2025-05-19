import { appointmentModel } from "../models/appointment.model.js"

const getAllAppointment = async(req,res)=>{
    try{
        const information = await appointmentModel.getAll() 
        if (!information) return res.status(404).json({ error: 'citas no encontrada' });
        res.json(information)  
    }catch(error){
        res.status(500).json({ error: 'Error al obtener las citas' });
        console.log("error al cargar los datos de la cita")}
}

const getByIdAppointment = async(req,res)=>{
    try {
        const id = req.params.id;
      const appointments = await appointmentModel.getById(id);
      if (!appointments) return res.status(404).json({ error: 'Cita no encontrado' });
      res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la cita' });
    }
}

const createAppointment = async(req,res)=>{
    try {
        const appointment = req.body
        const id_cita = await appointmentModel.create(appointment)
     res.status(201).send({message:"Cita registrado",id_cita});
    } catch (error) {
       console.log("error al crear Cita",error)
        res.status(500).json({message:"error al crear la venta"})
    
    }
}

const updateAppointment = async(req,res)=>{
    try {
        const id = parseInt(req.params.id)
        const appoinment = await appointmentModel.update(id,req.body);
        if (!appoinment) return res.status(404).json({ error: 'appointment no encontrado' });
        res.json(appoinment);
    } catch (error) {
        res.status(500).json({error:'Error al actualizar servicio'})
    }
}
const searchByRutAppointment = async(req,res)=>{
    try {
        const rut = req.params.rut
        console.log(rut)
        const appoinments = await appointmentModel.searchByRut(rut)
        if (!appoinments) return res.status(404).json({ error: 'appointment no encontrado' });
        res.json(appoinments)
    } catch (error) {
        res.status(500).json({error:'Error al buscar las citas'})
    }
}

const deleteAppointment = async(req,res)=>{
try{
    const id = parseInt(req.params.id);
    await appointmentModel.deleteAppointment(id);
    res.status(200).json({message:"cita eliminada"})
}catch(error){
    res.status(500).json({error:'Error al eliminar cita'})
}
}

export const appointmentController = {getAllAppointment,getByIdAppointment,createAppointment,updateAppointment,deleteAppointment,searchByRutAppointment}