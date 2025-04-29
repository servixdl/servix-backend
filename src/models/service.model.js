import pool from "../../config/data/conection.db.js"

const getAll = async()=>{
    try{
        const query = 'SELECT * FROM servicios';
        const {rows: result} = await pool.query(query);
        return result;
    }catch(error){console.log("error al obtener servicios")}
}

const getById = async(id_servicio)=>{
    try{
        const query = 'SELECT * FROM servicios WHERE id_servicio = $1';  
        const result = await pool.query(query,[id_servicio]);
        return result.rows[0];
    }catch(error){console.log("error al obtener servicio")}
    
}

const create = async(service)=>{
    try{
        let {nombre,precio,descripcion,tipo_servicio_id,usuario_id} = service;
        const values = [nombre,precio,descripcion,tipo_servicio_id,usuario_id]
        const query =`INSERT INTO servicios (nombre,precio,descripcion,tipo_servicio_id,usuario_id) VALUES ($1,$2,$3,$4,$5) `    
        await pool.query(query,values)
    }catch(error){
        console.log("error al registrar el servicio",error)
        throw error;
    }
}

const updateService = async (id, service) =>{
    try {
        const { nombre, precio, descripcion, tipo_servicio_id, usuario_id } = service;
        const result = await pool.query(
          `UPDATE servicios SET nombre = $1, precio = $2, descripcion = $3, tipo_servicio_id = $4, usuario_id = $5
           WHERE id_servicio = $6 RETURNING *`,
          [nombre, precio, descripcion, tipo_servicio_id, usuario_id, id]
        );
        return result.rows[0];    
    } catch (error) {
        console.log("error al actualizar servicio")
        throw error
    }

  }
  
  
const getByName = async(palabra)=>{
    try {
        const query = `SELECT * FROM servicios s JOIN tipo_servicio ts ON s.tipo_servicio_id = ts.id_tipo_servicio WHERE LOWER(s.nombre) LIKE LOWER($1)`;
        const result = await pool.query(query,[`%${palabra}%`]);
        return result.rows;
    } catch (error) {
        console.log("error al buscar por nombre")
        throw error
    }
}


const deleteService= async(servicio_id)=>{
    try{
        const query = `DELETE FROM servicios WHERE id_servicio = $1 RETURNING  *`;
        const result =  await pool.query(query,[servicio_id]);
        return result.rows[0]
    }catch(error){
        console.log("error al eliminar")
        throw error
    }
}

    export const servicieModel = {create,deleteService,getAll,getById,getByName,updateService}
