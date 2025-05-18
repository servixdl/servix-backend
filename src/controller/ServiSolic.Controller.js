import { ServiSolicModel } from "../models/ServiSolic.js";


const getBitacora = async (req, res) => {
 try {
 const rut_usuario = req.params.rut;
 const bitacora = await BitacoraModel.getBitacoraByUsuario(rut_usuario);
 res.status(200).json(bitacora);
 } catch (error) {
 res.status(500).json({ message: "Error al obtener la bitácora" });
 }
};



const cancelar = async (req, res) => {
 try {
 const id = req.params.id;
 const cita = await BitacoraModel.cancelarCita(id);
 res.status(200).json({ message: "Cita cancelada", cita });
 } catch (error) {
 res.status(500).json({ message: "Error al cancelar la cita" });
 }
};


const eliminar = async (req, res) => {
 try {
 const id = req.params.id;
 await BitacoraModel.eliminarCita(id);
 res.status(200).json({ message: "Cita eliminada" });
 } catch (error) {
 res.status(500).json({ message: "Error al eliminar la cita" });
 }
};


export const ServiSolicController = {
getBitacora,
cancelar,
eliminar
};