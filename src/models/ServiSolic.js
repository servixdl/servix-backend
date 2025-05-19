import pool from "../../config/data/conection.db.js";

const getBitacoraByUsuario = async (rut_usuario) => {
  const query = `
 SELECT 
   s.nombre AS nombre_servicio, 
   ts.tipo_servicio AS tipo_servicio,
   s.descripcion, 
   c.fecha_cita AS fecha_venta, 
   v.total,
   c.id_cita, 
   c.estado AS estado_cita
 FROM citas c
 JOIN ventas v ON c.venta_id = v.id_venta
 JOIN servicios s ON v.servicio_id = s.id_servicio
 JOIN tipo_servicio ts ON s.tipo_servicio_id = ts.id_tipo_servicio
 WHERE c.usuario_id = $1
 ORDER BY c.fecha_cita DESC;
 ;`;
  const { rows } = await pool.query(query, [rut_usuario]);
  return rows;
};

const cancelarCita = async (id_cita) => {
  const query =
    "UPDATE citas SET estado = 'cancelada' WHERE id_cita = $1 RETURNING *";
  const { rows } = await pool.query(query, [id_cita]);
  return rows[0];
};

const eliminarCita = async (id_cita) => {
  const query = "DELETE FROM citas WHERE id_cita = $1";
  await pool.query(query, [id_cita]);
};

export const ServiSolicModel = {
  getBitacoraByUsuario,
  cancelarCita,
  eliminarCita,
};
