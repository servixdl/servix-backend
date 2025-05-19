import pool from "../../config/data/conection.db.js";

const getAll = async () => {
  try {
    const query = "SELECT * FROM citas";
    const { rows: result } = await pool.query(query);
    return result;
  } catch (error) {
    console.log("error al buscar las citas", error);
    throw error;
  }
};

const create = async (cita) => {
  try {
    let {  venta_id, fecha_cita, hora_inicio, hora_termino, usuario_id,estado } =
      cita;
    const values = [
        venta_id, fecha_cita, hora_inicio, hora_termino, usuario_id,estado 
    ];
    const query = `INSERT INTO citas (venta_id, fecha_cita, hora_inicio, hora_termino, usuario_id,estado ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id_cita`;
    const response = await pool.query(query,values);
        const {id_cita} = response.rows[0]
        return id_cita
  } catch (error) {
    console.log("error al registrar el servicio", error);
    throw error;
  }
};

const update = async (id, information) => {
  const {
    venta_id,
    fecha_cita,
    hora_inicio,
    hora_termino,
    estado,
    usuario_id,
  } = information;
  const result = await pool.query(
    `UPDATE citas SET venta_id = $1, fecha_cita = $2, hora_inicio = $3, hora_termino = $4, estado = $5 ,usuario_id =$6 WHERE id_cita = $7 RETURNING *`,
    [venta_id, fecha_cita, hora_inicio, hora_termino, estado, usuario_id, id]
  );
  return result.rows[0];
};

const updateCancel = async (id) => {
try{
  const result = await pool.query( `UPDATE citas SET estado = 'cancelada'  WHERE id_cita = $1 RETURNING *`,[id]);
  return result.rows[0];
}catch(error){console.log("error al cancelar cita",error)}

};

const deleteAppointment = async (id) => {
  try {
    const query = `DELETE FROM citas WHERE id_cita = $1 RETURNING  *`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.log("error al eliminar cita");
    throw error;
  }
};

const searchByRut = async (rut) => {
  try {
    console.log([rut]);
    const query = `SELECT * FROM citas WHERE usuario_id = $1`;
    const result = await pool.query(query, [rut]);
    return result.rows;
  } catch (error) {
    console.log("error al buscar citas por usuario");
    throw error;
  }
};

const getById = async (id) => {
  try {
    const query = `SELECT * FROM citas WHERE id_cita = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.log("error al buscar citas por usuario");
    throw error;
  }
};

export const appointmentModel = {
  getAll,
  getById,
  searchByRut,
  deleteAppointment,
  update,
  create,
  updateCancel
};
