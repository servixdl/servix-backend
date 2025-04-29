import { salesModelos } from "../models/sale.model.js";



const getAllSales = async(req,res)=>{
    try{
        const sales = req.body
        const information = await salesModelos.getAll(sales) 
        if (!information) return res.status(404).json({ error: 'Ventas no encontrado' });
        res.json(information)  
    }catch(error){
        res.status(500).json({ error: 'Error al obtener las ventas' });
        console.log("error al cargar las ventas")}

}

const getByIdSale = async(req,res)=>{
    try {
        const id = req.params.id;
      const sale = await salesModelos.getById(id);
      if (!sale) return res.status(404).json({ error: 'Venta no encontrado' });
      res.json(sale);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la venta' });
    }
}


const createSale = async(req,res)=>{
    try {
    const information = req.body
    await salesModelos.create(information)
     res.status(201).send("Venta Realizada");
    } catch (error) {
        res.status(500).send(error)
    console.log("error al crear venta")
    }
}

const searchByRutSale = async(req,res)=>{
    try {
        const rut = req.params.rut
        console.log(rut)
        const sales = await salesModelos.searchByRut(rut)
        if (!sales) return res.status(404).json({ error: 'Venta no encontrado' });
        res.json(sales)
    } catch (error) {
        res.status(500).json({error:'Error al buscar las ventas'})
    }
}

const updateSale = async(req,res)=>{
    try {
        const id = parseInt(req.params.id)
        const sale = await salesModelos.update(id,req.body);
        if (!sale) return res.status(404).json({ error: 'Venta no encontrado' });
        res.json(sale);
    } catch (error) {
        res.status(500).json({error:'Error al actualizar venta'})
    }
}


const deleteSale = async(req,res)=>{
try{
    const id = parseInt(req.params.id);
    await salesModelos.destroy(id);
    res.status(200).json({ message: 'venta eliminada'});
    
}catch(error){
    res.status(500).json({error:'Error al eliminar servicio'})
}
}
export const salesControllers = {createSale,getAllSales,deleteSale,updateSale,searchByRutSale,getByIdSale}