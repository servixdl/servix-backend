import pool from "../../config/data/conection.db.js"

const searchSalesAndAppointments = async(rut)=>{
    try {
        console.log([rut])
        const query = `SELECT * FROM ventas v JOIN citas c on v.id_venta = c.venta_id where v.usuario_id = $1`
        const result = await pool.query(query,[rut])
        return result.rows
    } catch (error) {
        console.log("error al buscar ventas por usuario")
        throw error
    }
}



export const transactionModelos = {searchSalesAndAppointments}