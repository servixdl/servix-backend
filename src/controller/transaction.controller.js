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

export const transactionControllers = {searchByRutSaleByRut}