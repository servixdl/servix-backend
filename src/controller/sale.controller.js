import { salesModelos } from "../models/sale.model.js";



const getAllSales = async (req, res) => {
  try {
    const sales = await salesModelos.getAll();

    if (!sales || sales.length === 0) {
      return res.status(404).json({ error: 'No se encontraron ventas.' });
    }

    res.status(200).json(sales);
  } catch (error) {
    console.error("Error al cargar las ventas:", error.message);
    res.status(500).json({ error: 'Error interno al obtener las ventas.' });
  }
};


const getByIdSale = async (req, res) => {
  try {
    const id = req.params.id;
    const sale = await salesModelos.getById(id);
    if (!sale) return res.status(404).json({ error: 'prestador  no encontrado' });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la venta' });
  }
};

const createSale = async(req,res)=>{
    try {
    const information = req.body
    const id_venta = await salesModelos.create(information)
     res.status(201).send({message:"Venta Realizada",id_venta});
    } catch (error) {}
        res.status(500).send(error)
    console.log("error al crear venta")
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
        const id = req.params.id
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