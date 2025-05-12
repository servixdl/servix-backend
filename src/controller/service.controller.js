import { servicieModel } from "../models/service.model.js";

const getAllServices = async (req, res) => {
  try {
    const information = await servicieModel.getAll();
    if (!information || information.length === 0)
      return res.status(404).json({ error: "Servicio no encontrado" });

     res.status(200).json(information);
  } catch (error) {
    console.error("Error en getAllServices:", error);
    res.status(500).json({ error: "Error al obtener el servicio" });
  }
};

const getByIdService = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await servicieModel.getById(id);
    if (!service)
      return res.status(404).json({ error: "Servicio no encontrado" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el servicio" });
  }
};
const getByIdRut = async (req, res) => {
  try {
    const rut = req.params.rut;
    const service = await servicieModel.getByRut(rut);
    if (!service)
      return res.status(404).json({ error: "Servicios no encontrado" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los servicios" });
  }
};

const createService = async (req, res) => {
  try {
    const service = req.body;
    await servicieModel.create(service);
    res.status(201).send("Servicio registrado");
  } catch (error) {
    res.status(500).send(error);
    console.log("error al crear servicio");
  }
};

const updateService = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const information = await servicieModel.updateService(id, req.body);
    if (!information)
      return res.status(404).json({ error: "Servicio no encontrado" });
    res.json(information);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar servicio" });
  }
};

const searchByNameService = async (req, res) => {
  try {
    const keyword = req.params.parameter;
    const services = await servicieModel.getByName(keyword);
    if (!services)
      return res.status(404).json({ error: "Servicio no encontrado" });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el servicio" });
  }
};

const deleteService = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await servicieModel.deleteService(id);
    res.status(200).json({ message: "servicio eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar servicio" });
  }
};

export const serviceController = {
  getByIdService,
  createService,
  deleteService,
  getByIdService,
  updateService,
  searchByNameService,
  getAllServices,
  getByIdRut
};
