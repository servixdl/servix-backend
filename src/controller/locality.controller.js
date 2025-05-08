import { localityModels } from "../models/locality.models.js";

const getAllRegions = async(req,res)=>{
    try{
        const information = await localityModels.getAllRegion() 
        if (!information) return res.status(404).json({ error: 'regiones no encontrada' });
        res.json(information)  
    }catch(error){
        res.status(500).json({ error: 'Error al obtener las regiones' });
        console.log("error al cargar los datos de las regiones")}
}
const getByIdRegion = async(req,res)=>{
    try {
        const id = req.params.id;
      const comunes = await localityModels.getComuneByRegion(id);
      if (!comunes) return res.status(404).json({ error: 'comunas no encontradas' });
      res.json(comunes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las comunas' });
    }
}


export const localityController = {getAllRegions,getByIdRegion}