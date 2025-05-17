import { transactionModelos } from "../models/transaction.models.js"

const searchByRutSaleByRut = async(req,res)=>{
    try {
        const rut = req.params.rut
        console.log(rut)
        const sales = await transactionModelos.searchSalesAndAppointments(rut)
        if (!sales) return res.status(404).json({ error: 'Venta no encontrada' });
        res.json(sales)
    } catch (error) {
        res.status(500).json({error:'Error al buscar las ventas'})
    }
}

const createProvisionalSale = async(req,res)=>{
    try{
    const provisionalSale = req.body;
    await transactionModelos.createProvisionalSale(provisionalSale);
    res.status(201).send("venta provisioria registrada");
    }catch(error){
 res.status(500).json({error:'Error al buscar las ventas'})
    }
    
}
const getByIdOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const sale = await transactionModelos.getByOrder(id);
    if (!sale) return res.status(404).json({ error: 'venta provisoria no encontrada' });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la venta' });
  }
};


export const transactionControllers = {searchByRutSaleByRut,createProvisionalSale,getByIdOrder}