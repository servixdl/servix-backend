import pool from "../../config/data/conection.db.js";

const getAll = async () => {
  try {
    const query = 'SELECT * FROM tipo_servicio';
    const { rows: result } = await pool.query(query);
    return result;
  } catch (error) {
    console.log("Error al obtener tipo de servicios");
    throw error;
  }
};

const getById = async (tipo_servicio) => {
  try {
    const query = "SELECT * FROM tipo_servicio WHERE id_tipo_servicio = $1";
    const result = await pool.query(query, [tipo_servicio]);
    return result.rows[0];
  } catch (error) {
    console.log("error al obtener tipo de servicio");
  }
};


const create = async (service) => {
  try {
    let { nombre, precio, descripcion, imagen,tipo_servicio_id, usuario_id } = service;
    const values = [nombre, precio, descripcion, imagen,tipo_servicio_id, usuario_id];
    const query = `INSERT INTO servicios (nombre,precio,imagen,descripcion,tipo_servicio_id,usuario_id) VALUES ($1,$2,$3,$4,$5,$6) `;
    await pool.query(query, values);
  } catch (error) {
    console.log("error al registrar el servicio", error);
    throw error;
  }
};



const deleteTipeService = async (servicio_id) => {
  try {
    const query = `DELETE FROM tipo_servicio WHERE id_tipo_servicio = $1 RETURNING  *`;
    const result = await pool.query(query, [servicio_id]);
    return result.rows[0];
  } catch (error) {
    console.log("error al eliminar el tipo de servicio");
    throw error;
  }
};

export const typeservicesModel = {
  create,
  deleteTipeService,
  getAll,
  getById,
};
