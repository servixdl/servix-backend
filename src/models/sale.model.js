import pool from "../../config/data/conection.db.js"

const getAll = async () => {
  try {
    const query = "SELECT * FROM ventas";
    const { rows: result } = await pool.query(query);
    return result;
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    throw error;
  }
};


const getById = async(id)=>{
    try {
        const query = `SELECT *  FROM ventas WHERE id_venta = $1`
        const result = await pool.query(query,[id])
        return result.rows[0]
    } catch (error) {
        console.log("error al buscar venta ")
        throw error
    }
}
const create = async(sale)=>{
    try{
        let {usuario_id,servicio_id,fecha_venta,total} = sale;
        const values = [usuario_id,servicio_id,fecha_venta,total]
        const query =`INSERT INTO ventas (usuario_id,servicio_id,fecha_venta,total) VALUES ($1,$2,$3,$4) RETURNING id_venta`    
        const response = await pool.query(query,values);
        const {id_venta} = response.rows[0]
        return id_venta
    }catch(error){
        console.log("error al registrar la venta",error)
        throw error;
    }
}

const update = async (id, sale) =>{
    try {
        const { usuario_id,servicio_id,fecha_venta,total } = sale;
        const result = await pool.query(
          `UPDATE ventas SET usuario_id = $1, servicio_id = $2, fecha_venta = $3, total = $4 WHERE id_venta = $5 RETURNING *`,
          [usuario_id,servicio_id,fecha_venta,total, parseInt(id)]
        );
        return result.rows[0];
      } catch (error) {
        console.log("error al actualizar venta")
        throw error
    }
}

const destroy= async(servicio_id)=>{
    try{
        const query = `DELETE FROM ventas WHERE id_venta = $1 RETURNING  *`;
        const result =  await pool.query(query,[servicio_id]);
        return result.rows[0]
    }catch(error){
        console.log("error al eliminar venta")
        throw error
    }  
}

const searchByRut = async(rut)=>{
    try {
        console.log([rut])
        const query = `SELECT * FROM ventas WHERE usuario_id = $1`
        const result = await pool.query(query,[rut])
        return result.rows
    } catch (error) {
        console.log("error al buscar ventas por usuario")
        throw error
    }
}
export const salesModelos = {getAll,getById,searchByRut,update,create,destroy}
