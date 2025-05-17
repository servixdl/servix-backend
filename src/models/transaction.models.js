import pool from "../../config/data/conection.db.js"

const searchSalesAndAppointments = async(rut)=>{
    try {
        const query = `SELECT * FROM ventas v JOIN citas c on v.id_venta = c.venta_id where v.usuario_id = $1`
        const result = await pool.query(query,[rut])
        return result.rows
    } catch (error) {
        console.log("error al buscar ventas por usuario")
        throw error
    }
}
const getByOrder = async (order) => {
  try {
    const query = "SELECT * FROM venta_provisoria WHERE buyorder = $1";
    const result = await pool.query(query, [order]);
    return result.rows[0];
  } catch (error) {
    console.log("error al obtener venta provisoria",error);
  }
};

const createProvisionalSale = async(sale)=>{
    try{ 
        let { buyOrder,usuario_id ,servicio_id ,fecha_venta ,total ,fecha_cita ,hora_inicio ,hora_termino ,  estado } = sale;
    const values = [buyOrder,usuario_id ,servicio_id ,fecha_venta ,total ,fecha_cita ,hora_inicio ,hora_termino ,  estado];
     const query = `INSERT INTO venta_provisoria ( buyOrder,usuario_id ,servicio_id ,fecha_venta ,total ,fecha_cita ,hora_inicio ,hora_termino,  estado) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`
    await pool.query(query, values);
    }catch(error){
      console.log("error al obtener venta provisoria :",error);
    };
}

export const transactionModelos = {searchSalesAndAppointments,createProvisionalSale,getByOrder}