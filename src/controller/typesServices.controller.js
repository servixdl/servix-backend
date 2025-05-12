import { typeservicesModel } from "../models/typesServices.model.js";


const getAllTypeServices = async (req, res) => {
  try {
    const information = await typeservicesModel.getAll();
    if (!information || information.length === 0)
      return res.status(404).json({ error: "Tipo de Servicios no encontrado" });

     res.status(200).json(information);
  } catch (error) {
    console.error("Error en getAllTypeServices:", error);
    res.status(500).json({ error: "Error al obtener el tipo de servicio" });
  }
};

const getByIdTypeService = async (req, res) => {
  try {
    const id = req.params.id;
    const typeService = await typeservicesModel.getById(id);
    if (!typeService)
      return res.status(404).json({ error: "Servicio no encontrado" });
    res.json(typeService);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el servicio" });
  }
};

const createTypeService = async (req, res) => {
  try {
    const typeService = req.body;
    await typeservicesModel.create(typeService);
    res.status(201).send("Tipo Servicio registrado");
  } catch (error) {
    res.status(500).send(error);
    console.log("error al crear tipo servicio");
  }
};


const deleteTypeService = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await typeservicesModel.deleteTipeService(id);
    res.status(200).json({ message: "tipo servicio eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar tipo servicio" });
  }
};

export const typeservicesController ={createTypeService,deleteTypeService,getAllTypeServices,getByIdTypeService}