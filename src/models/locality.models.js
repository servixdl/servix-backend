import pool from "../../config/data/conection.db.js"



const getAllRegion = async()=>{
    try{
        const query = 'SELECT * FROM region';
        const {rows: result} = await pool.query(query);
        return result;
    }catch(error){
        console.log("error al buscar las region",error)
        throw error;
    }
}



const getComuneByRegion = async(id)=>{
    try {
        const query = `SELECT * FROM comuna WHERE region_id = $1`
        const result = await pool.query(query,[id])
        return result.rows[0]
    } catch (error) {
        console.log("error al buscar comunas por region")
        throw error
    }
}


export const localityModels = {getAllRegion,getComuneByRegion}