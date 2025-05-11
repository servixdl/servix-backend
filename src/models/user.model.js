import pool from "../../config/data/conection.db.js";
import bcrypt from "bcryptjs";

const login = async (correo, contrasenaIngresada) => {
  try {
    const values = [correo];
    const consulta = "SELECT * FROM usuario WHERE correo = $1";
    const { rows, rowCount } = await pool.query(consulta, values);

    if (rowCount === 0) {
      throw { code: 401, message: "Usuario no encontrado" };
    }

    const usuario = rows[0];
    const { contrasena: passwordEncriptada, ...usuarioSinPassword } = usuario;

    const resultado = bcrypt.compareSync(contrasenaIngresada, passwordEncriptada);
    if (!resultado) {
      throw { code: 401, message: "Email o contraseña incorrecta" };
    }

    return { user: usuarioSinPassword };
  } catch (error) {
    console.log("Error en login:", error);
    throw error;
  }
};

const register = async (user) => {
  try {
    let {
      rut,
      nombre,
      fecha_nacimiento,
      correo,
      contrasena,
      vendedor,
      oficio,
      direccion,
      imagen,
      telefono,
      experiencia,
      comuna_id
    } = user;

    const passwordEncriptado = bcrypt.hashSync(contrasena, 10);

    const values = [
      rut,
      nombre,
      fecha_nacimiento,
      correo,
      passwordEncriptado,
      vendedor,
      oficio,
      direccion,
      imagen,
      telefono,
      experiencia,
      comuna_id
    ];

    const query = `
      INSERT INTO usuario 
      (rut, nombre, fecha_nacimiento, correo, contrasena, vendedor, oficio, direccion, imagen, telefono, experiencia, comuna_id)
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;

    await pool.query(query, values);
    console.log("Usuario registrado");
  } catch (error) {
    console.log("Error al registrar usuario:", error);
    throw error;
  }
};

const getAll = async () => {
  try {
    const query = `
      SELECT rut, nombre, fecha_nacimiento, correo, direccion 
      FROM usuario
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.log("Error al obtener usuarios:", error);
    throw error;
  }
};

const update = async (rut, usuario) => {
  try {
    const campos = [];
    const valores = [];
    let i = 1;

    for (const [key, value] of Object.entries(usuario)) {
      if (value !== undefined) {
        campos.push(`${key} = $${i}`);
        valores.push(value);
        i++;
      }
    }

    if (campos.length === 0) {
      throw new Error("No se enviaron campos para actualizar");
    }

    valores.push(rut); // el último valor es para el WHERE

    const query = `
      UPDATE usuario SET ${campos.join(", ")}
      WHERE rut = $${valores.length}
      RETURNING *
    `;

    const result = await pool.query(query, valores);
    return result.rows[0];
  } catch (error) {
    console.log("Error al actualizar usuario:", error);
    throw error;
  }
};

const searchById = async (rut) => {
  try {
    const query = `
      SELECT 
        u.rut, 
        u.nombre, 
        u.fecha_nacimiento, 
        u.correo, 
        u.direccion,
        u.telefono,
        u.vendedor,
        u.oficio,
        u.experiencia,
        u.imagen,
        c.id AS comuna_id,
        c.nombre AS comuna_nombre,
        r.id AS region_id,
        r.nombre AS region_nombre
      FROM usuario u
      LEFT JOIN comuna c ON u.comuna_id = c.id
      LEFT JOIN region r ON c.region_id = r.id
      WHERE u.rut = $1
    `;

    const result = await pool.query(query, [rut]);
    const row = result.rows[0];

    return {
      rut: row.rut,
      nombre: row.nombre,
      fecha_nacimiento: row.fecha_nacimiento,
      correo: row.correo,
      direccion: row.direccion,
      telefono: row.telefono,
      vendedor: row.vendedor,
      oficio: row.oficio,
      experiencia: row.experiencia,
      imagen: row.imagen,
      comuna: {
        id: row.comuna_id,
        nombre: row.comuna_nombre,
        region_id: row.region_id,
        region_nombre: row.region_nombre
      }
    };
  } catch (error) {
    console.log("Error al buscar usuario por RUT:", error);
    throw error;
  }
};


const destroy = async (rut) => {
  try {
    const query = "DELETE FROM usuario WHERE rut = $1 RETURNING *";
    const result = await pool.query(query, [rut]);
    return result.rows[0];
  } catch (error) {
    console.log("Error al eliminar usuario:", error);
    throw error;
  }
};

export const usermodel = {
  register,
  login,
  searchById,
  destroy,
  getAll,
  update,
};
